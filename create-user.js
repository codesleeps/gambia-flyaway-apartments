// Script to create a new test user
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  "https://wbfoyjmulsvnnmnrerea.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndiZm95am11bHN2bm5tbnJlcmVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwNTA3MjcsImV4cCI6MjA2NTYyNjcyN30.iedmhF5A8grE1Giozk6pKitu1p370wHgMsfbSms_4vM"
);

async function createNewUser() {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: 'testuser123@gmail.com',
      password: 'password123',
      options: {
        data: {
          full_name: 'Test User',
        },
      },
    });

    if (error) {
      console.error('Error creating user:', error);
    } else {
      console.log('New test user created successfully:', data);
      console.log('Email: testuser123@gmail.com');
      console.log('Password: password123');
    }
  } catch (error) {
    console.error('Script error:', error);
  }
}

createNewUser(); 