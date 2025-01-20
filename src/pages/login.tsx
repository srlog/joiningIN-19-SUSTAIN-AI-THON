import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement login logic
  };

  return (
    <>
      <video
        className="video-background"
        autoPlay
        loop
        muted
        playsInline
        src="https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-1610-large.mp4"
      />
      <div className="video-overlay" />
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-[400px] glass-card">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center gradient-text">Welcome Back</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-background/50 border-border/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-background/50 border-border/50"
                />
              </div>
              <Button type="submit" className="w-full glow">
                Sign In
              </Button>
              <div className="text-center space-y-2">
                <Link to="/forgot-password" className="text-sm text-primary hover:text-primary/80 hover:underline block">
                  Forgot Password?
                </Link>
                <div className="text-sm text-muted-foreground">
                  Don't have an account?{' '}
                  <Link to="/signup" className="text-primary hover:text-primary/80 hover:underline">
                    Sign Up
                  </Link>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}