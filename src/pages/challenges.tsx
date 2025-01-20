import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, Target, CheckCircle, Clock, Award, Calendar } from 'lucide-react';
import { challengeApi } from '@/lib/api';
import type { Challenge } from '@/lib/types';

export function Challenges() {
  const [upcomingChallenges, setUpcomingChallenges] = useState<Challenge[]>([]);
  const [ongoingChallenges, setOngoingChallenges] = useState<Challenge[]>([]);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);

  useEffect(() => {
    const loadChallenges = async () => {
      try {
        const [upcoming, ongoing] = await Promise.all([
          challengeApi.getChallengesByCategory('upcoming'),
          challengeApi.getChallengesByCategory('ongoing'),
        ]);
        setUpcomingChallenges(upcoming);
        setOngoingChallenges(ongoing);
      } catch (error) {
        console.error('Failed to load challenges:', error);
      }
    };
    loadChallenges();
  }, []);

  const handleStartChallenge = async (challengeId: string) => {
    try {
      const challenge = await challengeApi.startChallenge(challengeId);
      // Refresh challenges after starting
      const [upcoming, ongoing] = await Promise.all([
        challengeApi.getChallengesByCategory('upcoming'),
        challengeApi.getChallengesByCategory('ongoing'),
      ]);
      setUpcomingChallenges(upcoming);
      setOngoingChallenges(ongoing);
    } catch (error) {
      console.error('Failed to start challenge:', error);
    }
  };

  const handleTaskToggle = async (challengeId: string, taskId: string, completed: boolean) => {
    try {
      await challengeApi.updateProgress(challengeId, taskId, completed);
      // Refresh ongoing challenges after updating task
      const ongoing = await challengeApi.getChallengesByCategory('ongoing');
      setOngoingChallenges(ongoing);
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-secondary/10 text-secondary border-secondary/20';
      case 'medium':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'hard':
        return 'bg-accent/10 text-accent border-accent/20';
      default:
        return '';
    }
  };

  const ChallengeCard = ({ challenge }: { challenge: Challenge }) => (
    <Card key={challenge.id} className="border-2 border-border/50 hover:border-border transition-colors">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{challenge.title}</span>
          <Badge className={getDifficultyColor(challenge.difficulty)}>
            {challenge.difficulty}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">{challenge.description}</p>
        
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4" />
            <span>{challenge.duration} days</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>{new Date(challenge.startDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Award className="h-4 w-4" />
            <span>{challenge.rewards.points} points</span>
          </div>
        </div>

        {challenge.category === 'ongoing' && (
          <>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>
                  {Math.round((challenge.tasks.filter(t => t.completed).length / challenge.tasks.length) * 100)}%
                </span>
              </div>
              <Progress 
                value={(challenge.tasks.filter(t => t.completed).length / challenge.tasks.length) * 100} 
                className="h-2" 
              />
            </div>

            <div className="space-y-2">
              {challenge.tasks.map((task) => (
                <div key={task.id} className="flex items-center space-x-2">
                  <CheckCircle 
                    className={`h-4 w-4 cursor-pointer transition-colors ${
                      task.completed ? 'text-primary' : 'text-muted-foreground'
                    }`}
                    onClick={() => handleTaskToggle(challenge.id, task.id, !task.completed)}
                  />
                  <span className={task.completed ? 'line-through text-muted-foreground' : ''}>
                    {task.title}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}

        <Dialog>
          <DialogTrigger asChild>
            <Button 
              className="w-full button-gradient hover:opacity-90 transition-opacity"
              disabled={challenge.category === 'ongoing' && 
                challenge.tasks.every(t => t.completed)}
            >
              {challenge.category === 'upcoming' ? 'Start Challenge' : 
               challenge.tasks.every(t => t.completed) ? 'Completed!' : 
               'Continue Challenge'}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{challenge.title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p>{challenge.description}</p>
              <div className="space-y-2">
                <h3 className="font-semibold">Tasks to Complete:</h3>
                {challenge.tasks.map((task) => (
                  <div key={task.id} className="flex items-center space-x-2">
                    <CheckCircle 
                      className={`h-4 w-4 ${task.completed ? 'text-primary' : 'text-muted-foreground'}`}
                    />
                    <span>{task.title}</span>
                  </div>
                ))}
              </div>
              {challenge.category === 'upcoming' && (
                <Button 
                  className="w-full"
                  onClick={() => handleStartChallenge(challenge.id)}
                >
                  Begin Challenge
                </Button>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold">Challenges & Quests</h1>
        <Badge variant="secondary" className="flex items-center space-x-2">
          <Trophy className="h-4 w-4" />
          <span>5 Badges Earned</span>
        </Badge>
      </div>

      <Tabs defaultValue="ongoing" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="ongoing">Ongoing Challenges</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming Challenges</TabsTrigger>
        </TabsList>

        <TabsContent value="ongoing" className="space-y-6">
          {ongoingChallenges.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-8">
                <Trophy className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-xl font-medium text-center mb-2">No ongoing challenges</p>
                <p className="text-muted-foreground text-center">
                  Start a challenge from the upcoming challenges tab
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {ongoingChallenges.map((challenge) => (
                <ChallengeCard key={challenge.id} challenge={challenge} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {upcomingChallenges.map((challenge) => (
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}