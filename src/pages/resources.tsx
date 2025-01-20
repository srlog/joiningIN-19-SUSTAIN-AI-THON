import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
// import { Progress } from '@/components/ui/progress';
import { BookOpen, Video, Brain, Play, Clock, GraduationCap } from 'lucide-react';
// import { CheckCircle } from 'lucide-react';
import { resourceApi } from '@/lib/api';
import type { Resource } from '@/lib/types';

export function Resources() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadResources = async () => {
      try {
        const data = await resourceApi.getResources();
        setResources(data);
      } catch (error) {
        console.error('Failed to load resources:', error);
      } finally {
        setLoading(false);
      }
    };
    loadResources();
  }, []);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'text-green-500';
      case 'intermediate':
        return 'text-blue-500';
      case 'advanced':
        return 'text-purple-500';
      default:
        return '';
    }
  };

  const ResourceCard = ({ resource }: { resource: Resource }) => (
    <Card key={resource.id} className="group hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-lg">{resource.title}</span>
          <div className="flex items-center space-x-2 text-sm">
            <GraduationCap className={`h-4 w-4 ${getDifficultyColor(resource.difficulty)}`} />
            <span className={getDifficultyColor(resource.difficulty)}>
              {resource.difficulty}
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">{resource.description}</p>
        
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          {resource.duration && (
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>{resource.duration} min</span>
            </div>
          )}
          <div className="flex items-center space-x-2">
            <BookOpen className="h-4 w-4" />
            <span>{resource.author}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {resource.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
            >
              {tag}
            </span>
          ))}
        </div>

        <Button 
          className="w-full group-hover:bg-primary/90 transition-colors"
          variant={resource.type === 'video' ? 'default' : 'outline'}
        >
          {resource.type === 'article' ? (
            'Read Article'
          ) : resource.type === 'video' ? (
            <span className="flex items-center space-x-2">
              <Play className="h-4 w-4" />
              <span>Watch Video</span>
            </span>
          ) : (
            'Start Exercise'
          )}
        </Button>
      </CardContent>
    </Card>
  );

  if (loading) {
    return <div>Loading resources...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Mental Health Resources</h1>

      <Tabs defaultValue="articles" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
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

        <TabsContent value="articles">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources
              .filter((r) => r.type === 'article')
              .map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="videos">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources
              .filter((r) => r.type === 'video')
              .map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="exercises">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources
              .filter((r) => r.type === 'exercise')
              .map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}