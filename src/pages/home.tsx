import { MoodTracker } from '@/components/mood/mood-tracker';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, Calendar, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Home() {
  return (
    <>
      <video
        className="video-background"
        autoPlay
        loop
        muted
        playsInline
        src="https://assets.mixkit.co/videos/preview/mixkit-white-clouds-time-lapse-2657-large.mp4"
      />
      <div className="video-overlay" />
      <div className="space-y-8">
        <h1 className="text-5xl font-bold gradient-text text-center">Welcome back!</h1>
        
        <MoodTracker />
        
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="gradient-card hover-glow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-primary">
                <MessageCircle className="h-6 w-6" />
                <span>Community Support</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Connect with others who understand what you're going through.
              </p>
              <Link to="/forum">
                <Button className="w-full button-gradient text-white">Join Discussion</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="gradient-card hover-glow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-secondary">
                <Calendar className="h-6 w-6" />
                <span>Counseling</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Book a session with our professional counselors.
              </p>
              <Link to="/appointments">
                <Button className="w-full button-gradient text-white">Book Session</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="gradient-card hover-glow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-accent">
                <BookOpen className="h-6 w-6" />
                <span>Resources</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Explore our library of mental health resources.
              </p>
              <Link to="/resources">
                <Button className="w-full button-gradient text-white">Learn More</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}