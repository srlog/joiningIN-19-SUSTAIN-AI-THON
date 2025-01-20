import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Link } from 'react-router-dom';

export function Signup() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    age: '',
    interests: [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement signup logic
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
      <div className="min-h-screen flex items-center justify-center py-12">
        <Card className="w-[500px] glass-card">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center gradient-text">Create Account</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="bg-background/50 border-border/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  className="bg-background/50 border-border/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Enter your age"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  required
                  className="bg-background/50 border-border/50"
                />
              </div>
              <div className="space-y-2">
                <Label>What brings you here?</Label>
                <Select>
                  <SelectTrigger className="bg-background/50 border-border/50">
                    <SelectValue placeholder="Select your primary concern" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="anxiety">Anxiety</SelectItem>
                    <SelectItem value="depression">Depression</SelectItem>
                    <SelectItem value="stress">Stress Management</SelectItem>
                    <SelectItem value="relationships">Relationships</SelectItem>
                    <SelectItem value="self-improvement">Self Improvement</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full glow">
                Create Account
              </Button>
              <div className="text-center text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link to="/login" className="text-primary hover:text-primary/80 hover:underline">
                  Sign In
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}