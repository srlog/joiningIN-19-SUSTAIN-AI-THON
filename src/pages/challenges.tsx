import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Trophy, Target, CheckCircle, Clock, Award } from 'lucide-react';
import { challengeApi } from '@/lib/api';

interface Challenge {
  id: string;
  title: string;
  description: string;
  progress: number;
  tasks: { id: string; title: string; completed: boolean }[];
  reward: string;
  duration: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export function Challenges() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);

  useEffect(() => {
    const loadChallenges = async () => {
      try {
        const data = await challengeApi.getChallenges();
        setChallenges(data);
      } catch (error) {
        console.error('Failed to load challenges:', error);
      }
    };
    loadChallenges();
  }, []);

  const handleStartChallenge = async (challengeId: string) => {
    try {
      await challengeApi.startChallenge(challengeId);
      // Refresh challenges after starting
      const data = await challengeApi.getChallenges();
      setChallenges(data);
    } catch (error) {
      console.error('Failed to start challenge:', error);
    }
  };

  const handleTaskToggle = async (challengeId: string, taskId: string, completed: boolean) => {
    try {
      await challengeApi.updateProgress(challengeId, taskId, completed);
      // Refresh challenges after updating task
      const data = await challengeApi.getChallenges();
      setChallenges(data);
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Challenges & Quests</h1>
        <Badge variant="secondary" className="flex items-center space-x-2">
          <Trophy className="h-4 w-4" />
          <span>5 Badges Earned</span>
        </Badge>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {challenges.map((challenge) => (
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
              
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>{challenge.duration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="h-4 w-4" />
                  <span>{challenge.reward}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{challenge.progress}%</span>
                </div>
                <Progress value={challenge.progress} className="h-2" />
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

              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    className="w-full button-gradient hover:opacity-90 transition-opacity"
                    disabled={challenge.progress === 100}
                  >
                    {challenge.progress === 0 ? (
                      'Start Challenge'
                    ) : challenge.progress === 100 ? (
                      'Completed!'
                    ) : (
                      'Continue Challenge'
                    )}
                  </Button>
                </DialogTrigger>
                <DialogContent>
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
                    <Button 
                      className="w-full"
                      onClick={() => handleStartChallenge(challenge.id)}
                    >
                      {challenge.progress === 0 ? 'Begin Now' : 'Continue'}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}