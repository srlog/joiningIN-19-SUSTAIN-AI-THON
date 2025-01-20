import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Home, User, MessageCircle, Calendar, BookOpen, Trophy, LineChart, Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export function Navbar() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="border-b border-border/50 bg-background/50 backdrop-blur-lg">
      <div className="flex h-16 items-center px-4 container mx-auto">
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:block">
          <NavigationMenuList className="flex space-x-4">
            <NavigationMenuItem>
              <Link to="/">
                <Button
                  variant="ghost"
                  className={`nav-item flex items-center space-x-2 text-foreground hover:text-foreground ${
                    location.pathname === '/' ? 'active-nav-item text-foreground' : ''
                  }`}
                >
                  <Home className="h-4 w-4" />
                  <span>Home</span>
                </Button>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/forum">
                <Button
                  variant="ghost"
                  className={`nav-item flex items-center space-x-2 text-foreground hover:text-foreground ${
                    location.pathname === '/forum' ? 'active-nav-item text-foreground' : ''
                  }`}
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Forum</span>
                </Button>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/appointments">
                <Button
                  variant="ghost"
                  className={`nav-item flex items-center space-x-2 text-foreground hover:text-foreground ${
                    location.pathname === '/appointments' ? 'active-nav-item text-foreground' : ''
                  }`}
                >
                  <Calendar className="h-4 w-4" />
                  <span>Appointments</span>
                </Button>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/resources">
                <Button
                  variant="ghost"
                  className={`nav-item flex items-center space-x-2 text-foreground hover:text-foreground ${
                    location.pathname === '/resources' ? 'active-nav-item text-foreground' : ''
                  }`}
                >
                  <BookOpen className="h-4 w-4" />
                  <span>Resources</span>
                </Button>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/challenges">
                <Button
                  variant="ghost"
                  className={`nav-item flex items-center space-x-2 text-foreground hover:text-foreground ${
                    location.pathname === '/challenges' ? 'active-nav-item text-foreground' : ''
                  }`}
                >
                  <Trophy className="h-4 w-4" />
                  <span>Challenges</span>
                </Button>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/progress">
                <Button
                  variant="ghost"
                  className={`nav-item flex items-center space-x-2 text-foreground hover:text-foreground ${
                    location.pathname === '/progress' ? 'active-nav-item text-foreground' : ''
                  }`}
                >
                  <LineChart className="h-4 w-4" />
                  <span>Progress</span>
                </Button>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-background/95 backdrop-blur-lg border-b border-border/50 p-4 space-y-2 md:hidden">
            <Link to="/" onClick={() => setIsMenuOpen(false)}>
              <Button
                variant="ghost"
                className={`w-full justify-start space-x-2 text-foreground hover:text-foreground ${
                  location.pathname === '/' ? 'bg-accent/10' : ''
                }`}
              >
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Button>
            </Link>
            <Link to="/forum" onClick={() => setIsMenuOpen(false)}>
              <Button
                variant="ghost"
                className={`w-full justify-start space-x-2 text-foreground hover:text-foreground ${
                  location.pathname === '/forum' ? 'bg-accent/10' : ''
                }`}
              >
                <MessageCircle className="h-4 w-4" />
                <span>Forum</span>
              </Button>
            </Link>
            <Link to="/appointments" onClick={() => setIsMenuOpen(false)}>
              <Button
                variant="ghost"
                className={`w-full justify-start space-x-2 text-foreground hover:text-foreground ${
                  location.pathname === '/appointments' ? 'bg-accent/10' : ''
                }`}
              >
                <Calendar className="h-4 w-4" />
                <span>Appointments</span>
              </Button>
            </Link>
            <Link to="/resources" onClick={() => setIsMenuOpen(false)}>
              <Button
                variant="ghost"
                className={`w-full justify-start space-x-2 text-foreground hover:text-foreground ${
                  location.pathname === '/resources' ? 'bg-accent/10' : ''
                }`}
              >
                <BookOpen className="h-4 w-4" />
                <span>Resources</span>
              </Button>
            </Link>
            <Link to="/challenges" onClick={() => setIsMenuOpen(false)}>
              <Button
                variant="ghost"
                className={`w-full justify-start space-x-2 text-foreground hover:text-foreground ${
                  location.pathname === '/challenges' ? 'bg-accent/10' : ''
                }`}
              >
                <Trophy className="h-4 w-4" />
                <span>Challenges</span>
              </Button>
            </Link>
            <Link to="/progress" onClick={() => setIsMenuOpen(false)}>
              <Button
                variant="ghost"
                className={`w-full justify-start space-x-2 text-foreground hover:text-foreground ${
                  location.pathname === '/progress' ? 'bg-accent/10' : ''
                }`}
              >
                <LineChart className="h-4 w-4" />
                <span>Progress</span>
              </Button>
            </Link>
          </div>
        )}

        {/* Profile Button */}
        <div className="ml-auto">
          <Link to="/profile">
            <Button
              variant="ghost"
              size="icon"
              className={`nav-item text-foreground hover:text-foreground ${
                location.pathname === '/profile' ? 'active-nav-item text-foreground' : ''
              }`}
            >
              <User className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}