// Script to manually verify a user's email
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  "https://wbfoyjmulsvnnmnrerea.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndiZm95am11bHN2bm5tbnJlcmVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwNTA3MjcsImV4cCI6MjA2NTYyNjcyN30.iedmhF5A8grE1Giozk6pKitu1p370wHgMsfbSms_4vM"
);

async function verifyUser() {
  try {
    // First, try to sign in to see if the user is already verified
    const { data, error } = await supabase.auth.signInWithPassword({
      email: 'codesleep43@gmail.com',
      password: 'testpassword123',
    });

    if (error) {
      console.error('Sign in error:', error);
    } else {
      console.log('User is verified and can sign in:', data);
    }
  } catch (error) {
    console.error('Script error:', error);
  }
}

verifyUser(); 