import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Video, Brain, Play, CheckCircle } from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'video' | 'exercise';
  link: string;
  duration?: string;
  progress?: number;
}

const resources: Resource[] = [
  {
    id: '1',
    title: 'Understanding Anxiety',
    description: 'Learn about the causes and symptoms of anxiety disorders.',
    type: 'article',
    link: '#',
  },
  {
    id: '2',
    title: 'Meditation for Beginners',
    description: 'A guided introduction to meditation practices.',
    type: 'video',
    link: '#',
    duration: '15 min',
  },
  {
    id: '3',
    title: 'Breathing Exercises',
    description: 'Interactive breathing exercises for stress relief.',
    type: 'exercise',
    link: '#',
    progress: 60,
  },
  {
    id: '4',
    title: 'Progressive Muscle Relaxation',
    description: 'Learn how to relax your body systematically.',
    type: 'exercise',
    link: '#',
    progress: 30,
  },
  {
    id: '5',
    title: 'Mindfulness Practice',
    description: 'Daily mindfulness exercises to stay present.',
    type: 'exercise',
    link: '#',
    progress: 0,
  },
];

export function Resources() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Mental Health Resources</h1>

      <Tabs defaultValue="articles">
        <TabsList>
          <TabsTrigger value="articles" className="flex items-center space-x-2">
            <BookOpen className="h-4 w-4" />
            <span>Articles</span>
          </TabsTrigger>
          <TabsTrigger value="videos" className="flex items-center space-x-2">
            <Video className="h-4 w-4" />
            <span>Videos</span>
          </TabsTrigger>
          <TabsTrigger value="exercises" className="flex items-center space-x-2">
            <Brain className="h-4 w-4" />
            <span>Exercises</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="articles" className="space-y-4">
          {resources
            .filter((r) => r.type === 'article')
            .map((resource) => (
              <Card key={resource.id}>
                <CardHeader>
                  <CardTitle>{resource.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{resource.description}</p>
                  <Button>Read More</Button>
                </CardContent>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="videos" className="space-y-4">
          {resources
            .filter((r) => r.type === 'video')
            .map((resource) => (
              <Card key={resource.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {resource.title}
                    <span className="text-sm font-normal text-muted-foreground">
                      {resource.duration}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{resource.description}</p>
                  <Button className="flex items-center space-x-2">
                    <Play className="h-4 w-4" />
                    <span>Watch Now</span>
                  </Button>
                </CardContent>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="exercises" className="space-y-4">
          {resources
            .filter((r) => r.type === 'exercise')
            .map((resource) => (
              <Card key={resource.id}>
                <CardHeader>
                  <CardTitle>{resource.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{resource.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{resource.progress}%</span>
                    </div>
                    <Progress value={resource.progress} />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Button className="flex items-center space-x-2">
                      {resource.progress === 0 ? (
                        <>
                          <Play className="h-4 w-4" />
                          <span>Start Exercise</span>
                        </>
                      ) : resource.progress === 100 ? (
                        <>
                          <CheckCircle className="h-4 w-4" />
                          <span>Completed</span>
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4" />
                          <span>Continue</span>
                        </>
                      )}
                    </Button>
                    {resource.progress > 0 && (
                      <Button variant="outline">Reset Progress</Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}