// Script to create a fresh test user and verify it works
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  "https://wbfoyjmulsvnnmnrerea.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndiZm95am11bHN2bm5tbnJlcmVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwNTA3MjcsImV4cCI6MjA2NTYyNjcyN30.iedmhF5A8grE1Giozk6pKitu1p370wHgMsfbSms_4vM"
);

async function createAndTestUser() {
  try {
    const testEmail = 'freshuser@gmail.com';
    const testPassword = 'password123';
    
    console.log('Creating new test user...');
    
    // Create the user
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: testEmail,
      password: testPassword,
      options: {
        data: {
          full_name: 'Fresh Test User',
        },
      },
    });

    if (signUpError) {
      console.error('Error creating user:', signUpError);
      return;
    }

    console.log('User created successfully:', signUpData);
    console.log('User ID:', signUpData.user?.id);
    console.log('Email confirmed:', signUpData.user?.email_confirmed_at);
    
    // Wait a moment for the user to be fully created
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('\nTesting sign in...');
    
    // Try to sign in immediately
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email: testEmail,
      password: testPassword,
    });

    if (signInError) {
      console.error('Sign in error:', signInError);
    } else {
      console.log('Sign in successful!');
      console.log('Session:', signInData.session);
      console.log('\n=== TEST CREDENTIALS ===');
      console.log('Email:', testEmail);
      console.log('Password:', testPassword);
      console.log('=======================');
    }
    
  } catch (error) {
    console.error('Script error:', error);
  }
}

createAndTestUser(); 