// Test script to create a user directly in the database
// Run this with: node test-user.js

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  "https://wbfoyjmulsvnnmnrerea.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndiZm95am11bHN2bm5tbnJlcmVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwNTA3MjcsImV4cCI6MjA2NTYyNjcyN30.iedmhF5A8grE1Giozk6pKitu1p370wHgMsfbSms_4vM"
);

async function createTestUser() {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: 'codesleep43@gmail.com',
      password: 'testpassword123',
      options: {
        data: {
          full_name: 'Test User',
        },
      },
    });

    if (error) {
      console.error('Error creating user:', error);
    } else {
      console.log('User created successfully:', data);
    }
  } catch (error) {
    console.error('Script error:', error);
  }
}

createTestUser(); 