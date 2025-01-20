import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from '@/components/layout/navbar';
import { Toaster } from '@/components/ui/toaster';
import { Login } from '@/pages/login';
import { Signup } from '@/pages/signup';
import { Home } from '@/pages/home';
import { Forum } from '@/pages/forum';
import { Appointments } from '@/pages/appointments';
import { Resources } from '@/pages/resources';
import { Challenges } from '@/pages/challenges';
import { Progress } from '@/pages/progress';
import { Profile } from '@/pages/profile';

function App() {
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
                <Navbar />
                <main className="container mx-auto py-6">
                  <Routes>
                    <Route path="/" element={<Home />} />
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