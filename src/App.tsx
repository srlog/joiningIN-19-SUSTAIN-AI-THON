import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NavBar } from '@/components/ui/tubelight-navbar';
import { Toaster } from '@/components/ui/toaster';
import { Home, MessageSquare, Calendar, BookOpen, Trophy, LineChart, User } from 'lucide-react';
import { Login } from '@/pages/login';
import { Signup } from '@/pages/signup';
import { Home as HomePage } from '@/pages/home';
import { Forum } from '@/pages/forum';
import { Appointments } from '@/pages/appointments';
import { Resources } from '@/pages/resources';
import { Challenges } from '@/pages/challenges';
import { Progress } from '@/pages/progress';
import { Profile } from '@/pages/profile';

function App() {
  const navItems = [
    { name: 'Home', url: '/', icon: Home },
    { name: 'Forum', url: '/forum', icon: MessageSquare },
    { name: 'Appointments', url: '/appointments', icon: Calendar },
    { name: 'Resources', url: '/resources', icon: BookOpen },
    { name: 'Challenges', url: '/challenges', icon: Trophy },
    { name: 'Progress', url: '/progress', icon: LineChart },
    { name: 'Profile', url: '/profile', icon: User },
  ];

  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/*"
            element={
              <>
                <NavBar items={navItems} />
                <main className="container mx-auto py-6 mt-24">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/forum" element={<Forum />} />
                    <Route path="/appointments" element={<Appointments />} />
                    <Route path="/resources" element={<Resources />} />
                    <Route path="/challenges" element={<Challenges />} />
                    <Route path="/progress" element={<Progress />} />
                    <Route path="/profile" element={<Profile />} />
                  </Routes>
                </main>
              </>
            }
          />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;