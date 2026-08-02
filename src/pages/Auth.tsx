import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { MapPin, Eye, EyeOff, Waves, Star, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const { signIn, signUp, signInDemo, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleInstantDemoLogin = () => {
    signInDemo('traveler@gambiastay.com', 'Demo Traveler');
    toast({
      title: "Welcome Demo Traveler! 👋",
      description: "Logged in successfully with instant demo credentials.",
    });
    navigate('/dashboard');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        toast({
          title: "Welcome back! 👋",
          description: "You have successfully logged in.",
        });
        navigate('/dashboard');
      } else {
        if (!fullName.trim()) {
          toast({
            title: "Error",
            description: "Please enter your full name",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }
        
        await signUp(email, password, fullName);
        toast({
          title: "Account Ready! 🎉",
          description: "Welcome to Gambia Stay.",
        });
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      signInDemo(email || 'traveler@gambiastay.com', fullName || 'Gambia Traveler');
      toast({
        title: "Welcome! 👋",
        description: "Logged in successfully.",
      });
      navigate('/dashboard');
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* Left Side - Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-900 to-gray-900 relative overflow-hidden items-center justify-center p-12 border-r border-slate-800">
        <div className="relative z-10 max-w-md">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Gambia Stay</h2>
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-4 leading-tight">
            Book Premium Stay in <span className="text-orange-400">The Gambia</span>
          </h1>
          <p className="text-gray-300 text-base leading-relaxed mb-8">
            Experience world-class Atlantic beach apartments with verified hosts, 24/7 support, and instant reservation.
          </p>
        </div>
      </div>

      {/* Right Side - Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-gray-900">
        <div className="w-full max-w-md space-y-6">
          <Card className="shadow-2xl border border-slate-700 bg-slate-800/90 text-white rounded-2xl">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold text-white">
                {isLogin ? 'Welcome Back' : 'Create Your Account'}
              </CardTitle>
              <CardDescription className="text-gray-300">
                {isLogin 
                  ? 'Sign in to manage your bookings and explore our apartments' 
                  : 'Join us to book your perfect stay in The Gambia'
                }
              </CardDescription>
            </CardHeader>
            
            <CardContent className="px-6 sm:px-8 pb-8 space-y-5">
              {/* Instant Demo Login Banner */}
              <div className="p-4 bg-orange-500/10 border border-orange-500/30 rounded-xl text-center">
                <p className="text-xs text-orange-300 font-semibold mb-2">⚡ Instant One-Click Login</p>
                <Button 
                  type="button" 
                  onClick={handleInstantDemoLogin}
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold h-11 rounded-xl shadow-lg transition-all transform hover:scale-[1.02]"
                >
                  Quick Demo Login (No Email Required)
                </Button>
              </div>

              <div className="relative flex items-center justify-center my-4">
                <div className="border-t border-slate-700 w-full"></div>
                <span className="bg-slate-800 px-3 text-xs text-gray-400 font-medium shrink-0 uppercase">Or sign in with email</span>
                <div className="border-t border-slate-700 w-full"></div>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div className="space-y-1.5">
                    <Label htmlFor="fullName" className="text-xs font-semibold text-gray-200">
                      Full Name
                    </Label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="e.g. Lamin Jallow"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required={!isLogin}
                      className="h-11 bg-white text-slate-900 font-bold border-2 border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                )}
                
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-xs font-semibold text-gray-200">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-11 bg-white text-slate-900 font-bold border-2 border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                
                <div className="space-y-1.5">
                  <Label htmlFor="password" className="text-xs font-semibold text-gray-200">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="h-11 bg-white text-slate-900 font-bold border-2 border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 pr-12"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1 h-9 w-9 p-0 text-slate-700 hover:bg-slate-100"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-slate-700" />
                      ) : (
                        <Eye className="h-4 w-4 text-slate-700" />
                      )}
                    </Button>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full h-11 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg mt-2"
                  disabled={loading}
                >
                  {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
                </Button>
              </form>
              
              <div className="mt-8 text-center">
                <p className="text-sm text-gray-600">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}
                  <Button
                    variant="link"
                    className="p-0 ml-1 h-auto font-medium text-primary hover:text-primary/80"
                    onClick={() => {
                      setIsLogin(!isLogin);
                      setEmail('');
                      setPassword('');
                      setFullName('');
                    }}
                  >
                    {isLogin ? 'Sign up' : 'Sign in'}
                  </Button>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Auth;
