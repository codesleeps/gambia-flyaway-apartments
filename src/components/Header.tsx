import React from 'react';
import { Button } from "@/components/ui/button";
import { MapPin, User, Calendar, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleAuthAction = () => {
    if (user) {
      signOut();
    } else {
      navigate('/auth');
    }
  };

  const handleDashboard = () => {
    navigate('/dashboard');
  };

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2 cursor-pointer pointer-events-auto">
          <a href="/#/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary">Gambia Stay</h1>
              <p className="text-xs text-muted-foreground">Premium Apartments</p>
            </div>
          </a>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6 pointer-events-auto">
          <a 
            href="/#/"
            className="text-foreground hover:text-primary transition-colors"
          >
            Home
          </a>
          <button 
            onClick={() => scrollToSection('apartments')}
            className="text-foreground hover:text-primary transition-colors"
          >
            Apartments
          </button>
          <button 
            onClick={() => scrollToSection('about')}
            className="text-foreground hover:text-primary transition-colors"
          >
            About
          </button>
          <button 
            onClick={() => scrollToSection('attractions')}
            className="text-foreground hover:text-primary transition-colors"
          >
            Attractions
          </button>
          <button
            onClick={() => {
              navigate('/contact');
              setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }, 100);
            }}
            className="text-foreground hover:text-primary transition-colors"
          >
            Contact
          </button>
        </nav>
        
        <div className="flex items-center space-x-3">
          {user && (
            <Button variant="outline" size="sm" className="hidden md:flex items-center space-x-2" onClick={handleDashboard}>
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </Button>
          )}
          <Button 
            size="sm" 
            className="flex items-center space-x-2"
            onClick={handleAuthAction}
            variant={user ? "outline" : "default"}
          >
            {user ? (
              <>
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </>
            ) : (
              <>
                <User className="w-4 h-4" />
                <span>Login</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
