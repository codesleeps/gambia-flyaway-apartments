import React from 'react';
import { Button } from "@/components/ui/button";
import { MapPin, User, LogOut, LayoutDashboard, Coins, Sparkles } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useCurrency, CURRENCIES, Currency } from '@/contexts/CurrencyContext';
import { useNavigate, useLocation } from 'react-router-dom';
import WeatherWidget from './WeatherWidget';

const Header = () => {
  const { user, signOut } = useAuth();
  const { currency, setCurrency } = useCurrency();
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
    <header className="bg-gray-900/95 backdrop-blur-md border-b border-gray-800 text-white sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 py-3.5 flex items-center justify-between">
        <div className="flex items-center space-x-3 cursor-pointer pointer-events-auto">
          <a href="/#/" className="flex items-center space-x-2.5">
            <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-md">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-orange-400 leading-tight">Gambia Flyaway</h1>
              <p className="text-[11px] text-gray-400">Luxury Apartments</p>
            </div>
          </a>
        </div>

        {/* Compact Weather Badge */}
        <div className="hidden lg:block">
          <WeatherWidget compact={true} />
        </div>

        <nav className="hidden md:flex items-center space-x-6 pointer-events-auto font-medium text-sm">
          <a 
            href="/#/"
            className="text-gray-300 hover:text-orange-400 transition-colors"
          >
            Home
          </a>
          <button 
            onClick={() => scrollToSection('apartments')}
            className="text-gray-300 hover:text-orange-400 transition-colors"
          >
            Apartments
          </button>
          <button 
            onClick={() => scrollToSection('flagship-preview')}
            className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 inline" />
            Flagship 2026
          </button>
          <button 
            onClick={() => scrollToSection('about')}
            className="text-gray-300 hover:text-orange-400 transition-colors"
          >
            About
          </button>
          <button 
            onClick={() => scrollToSection('attractions')}
            className="text-gray-300 hover:text-orange-400 transition-colors"
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
            className="text-gray-300 hover:text-orange-400 transition-colors"
          >
            Contact
          </button>
        </nav>

        <div className="flex items-center space-x-2.5">
          {/* Currency Switcher Dropdown */}
          <div className="relative flex items-center">
            <select
              aria-label="Select Currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value as Currency)}
              className="bg-slate-800 text-gray-200 border border-slate-700/80 rounded-xl text-xs font-semibold px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-orange-500/50 cursor-pointer shadow-sm"
            >
              {Object.values(CURRENCIES).map((c) => (
                <option key={c.code} value={c.code} className="bg-slate-900 text-white">
                  {c.symbol} {c.code}
                </option>
              ))}
            </select>
          </div>

          {user && (
            <Button 
              size="sm" 
              className="hidden md:flex items-center space-x-2 booking-gradient text-white shadow-md font-semibold border-0 hover:opacity-95 rounded-xl" 
              onClick={handleDashboard}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </Button>
          )}

          <Button 
            size="sm" 
            className="flex items-center space-x-2 booking-gradient text-white shadow-md font-semibold border-0 hover:opacity-95 rounded-xl"
            onClick={handleAuthAction}
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
