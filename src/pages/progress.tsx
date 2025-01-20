import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Trophy, Target, Calendar } from 'lucide-react';

const moodData = [
  { date: '2024-01-01', mood: 3 },
  { date: '2024-01-02', mood: 4 },
  { date: '2024-01-03', mood: 3 },
  { date: '2024-01-04', mood: 5 },
  { date: '2024-01-05', mood: 4 },
  { date: '2024-01-06', mood: 4 },
  { date: '2024-01-07', mood: 5 },
];

const achievements = [
  { id: '1', title: 'First Session Completed', date: '2024-01-02' },
  { id: '2', title: 'Week-long Meditation Streak', date: '2024-01-05' },
  { id: '3', title: 'Gratitude Challenge Completed', date: '2024-01-07' },
];

export function Progress() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Your Progress</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Trophy className="h-5 w-5" />
              <span>Achievements</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{achievements.length}</div>
            <p className="text-muted-foreground">Total milestones reached</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5" />
              <span>Challenges</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">2</div>
            <p className="text-muted-foreground">Active challenges</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Sessions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">3</div>
            <p className="text-muted-foreground">Counseling sessions attended</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Mood Tracking</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={moodData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[1, 5]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="mood"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className="flex items-center justify-between border-b last:border-0 pb-4 last:pb-0"
              >
                <div className="flex items-center space-x-3">
                  <Trophy className="h-5 w-5 text-primary" />
                  <span>{achievement.title}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {achievement.date}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}