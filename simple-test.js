// Simple test to check authentication
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  "https://wbfoyjmulsvnnmnrerea.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndiZm95am11bHN2bm5tbnJlcmVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwNTA3MjcsImV4cCI6MjA2NTYyNjcyN30.iedmhF5A8grE1Giozk6pKitu1p370wHgMsfbSms_4vM"
);

async function testAuth() {
  try {
    // Try to sign in with the test user
    console.log('Testing sign in with freshuser@gmail.com...');
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email: 'freshuser@gmail.com',
      password: 'password123',
    });

    if (error) {
      console.error('Sign in failed:', error.message);
      console.log('Error code:', error.status);
      
      if (error.message.includes('Email not confirmed')) {
        console.log('\n=== SOLUTION ===');
        console.log('You need to confirm the email in Supabase Dashboard:');
        console.log('1. Go to Authentication → Users');
        console.log('2. Find freshuser@gmail.com');
        console.log('3. Click "Confirm email" or similar option');
        console.log('================');
      }
    } else {
      console.log('Sign in successful!');
      console.log('User:', data.user.email);
    }
    
  } catch (error) {
    console.error('Script error:', error);
  }
}

testAuth(); 