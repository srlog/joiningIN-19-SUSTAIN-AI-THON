import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Home, User, MessageCircle, Calendar, BookOpen, Trophy, LineChart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export function Navbar() {
  const location = useLocation();

  return (
    <nav className="border-b border-border/50 bg-background/50 backdrop-blur-lg">
      <div className="flex h-16 items-center px-4 container mx-auto">
        <NavigationMenu>
          <NavigationMenuList className="flex space-x-4">
            <NavigationMenuItem>
              <Link to="/">
                <Button
                  variant="ghost"
                  className={`nav-item flex items-center space-x-2 hover:text-primary transition-colors ${
                    location.pathname === '/' ? 'active-nav-item text-primary' : ''
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
                  className={`nav-item flex items-center space-x-2 hover:text-secondary transition-colors ${
                    location.pathname === '/forum' ? 'active-nav-item text-secondary' : ''
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
                  className={`nav-item flex items-center space-x-2 hover:text-accent transition-colors ${
                    location.pathname === '/appointments' ? 'active-nav-item text-accent' : ''
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
                  className={`nav-item flex items-center space-x-2 hover:text-primary transition-colors ${
                    location.pathname === '/resources' ? 'active-nav-item text-primary' : ''
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
                  className={`nav-item flex items-center space-x-2 hover:text-secondary transition-colors ${
                    location.pathname === '/challenges' ? 'active-nav-item text-secondary' : ''
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
                  className={`nav-item flex items-center space-x-2 hover:text-accent transition-colors ${
                    location.pathname === '/progress' ? 'active-nav-item text-accent' : ''
                  }`}
                >
                  <LineChart className="h-4 w-4" />
                  <span>Progress</span>
                </Button>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="ml-auto">
          <Link to="/profile">
            <Button
              variant="ghost"
              size="icon"
              className={`nav-item hover:text-primary transition-colors ${
                location.pathname === '/profile' ? 'active-nav-item text-primary' : ''
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