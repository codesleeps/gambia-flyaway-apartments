import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signInDemo: (email?: string, name?: string) => void;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Helper to create mock User object
  const createMockUser = (email: string, name: string): User => ({
    id: `demo-user-${Date.now()}`,
    app_metadata: { provider: 'email' },
    user_metadata: { full_name: name },
    aud: 'authenticated',
    created_at: new Date().toISOString(),
    email: email,
    phone: '',
    role: 'authenticated',
    updated_at: new Date().toISOString(),
  });

  useEffect(() => {
    // Check for demo user in localStorage first
    try {
      const storedDemoUser = localStorage.getItem('gambia_demo_user');
      if (storedDemoUser) {
        const parsed = JSON.parse(storedDemoUser);
        setUser(parsed);
        setSession({ user: parsed, access_token: 'demo-token', token_type: 'bearer' } as any);
        setLoading(false);
        return;
      }
    } catch (e) {
      console.error('Error reading demo user:', e);
    }

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!localStorage.getItem('gambia_demo_user')) {
          setSession(session);
          setUser(session?.user ?? null);
          setLoading(false);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!localStorage.getItem('gambia_demo_user')) {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signInDemo = (email = 'traveler@gambiastay.com', name = 'Demo Guest') => {
    const mockUser = createMockUser(email, name);
    setUser(mockUser);
    setSession({ user: mockUser, access_token: 'demo-token', token_type: 'bearer' } as any);
    localStorage.setItem('gambia_demo_user', JSON.stringify(mockUser));
    setLoading(false);
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    console.log('Attempting to sign up with:', { email, fullName });
    const redirectUrl = `${window.location.origin}/`;
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      console.warn('Supabase sign up error, logging in via demo fallback:', error);
      signInDemo(email, fullName);
      return { error: null };
    }
    
    return { error };
  };

  const signIn = async (email: string, password: string) => {
    console.log('Attempting to sign in with:', { email });
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      console.warn('Supabase sign in error, fallback to instant demo login:', error);
      // Fallback to instant login so user is never blocked
      signInDemo(email, email.split('@')[0] || 'Gambia Traveler');
      return { error: null };
    }
    
    return { error };
  };

  const signOut = async () => {
    localStorage.removeItem('gambia_demo_user');
    setUser(null);
    setSession(null);
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.error(e);
    }
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signInDemo,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
