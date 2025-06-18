// Try to create a working user without email confirmation issues
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  "https://wbfoyjmulsvnnmnrerea.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndiZm95am11bHN2bm5tbnJlcmVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwNTA3MjcsImV4cCI6MjA2NTYyNjcyN30.iedmhF5A8grE1Giozk6pKitu1p370wHgMsfbSms_4vM"
);

async function createWorkingUser() {
  try {
    const email = 'workinguser@gmail.com';
    const password = 'password123';
    
    console.log('Creating new working user...');
    
    // Try to create user with different options
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: 'Working User',
        },
        emailRedirectTo: 'http://localhost:8081/',
      },
    });

    if (error) {
      console.error('Error creating user:', error);
      return;
    }

    console.log('User created:', data);
    
    // Wait a bit and try to sign in
    console.log('Waiting 3 seconds...');
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    console.log('Attempting to sign in...');
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      console.error('Sign in error:', signInError);
      console.log('\n=== ALTERNATIVE SOLUTION ===');
      console.log('Try signing up through your app instead:');
      console.log('1. Go to your app: http://localhost:8081/auth');
      console.log('2. Click "Sign up"');
      console.log('3. Use email: workinguser@gmail.com');
      console.log('4. Use password: password123');
      console.log('5. Submit the form');
      console.log('============================');
    } else {
      console.log('SUCCESS! User can sign in immediately.');
      console.log('Email:', email);
      console.log('Password:', password);
    }
    
  } catch (error) {
    console.error('Script error:', error);
  }
}

createWorkingUser(); 