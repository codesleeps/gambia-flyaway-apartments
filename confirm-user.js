// Script to manually confirm a user's email
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  "https://wbfoyjmulsvnnmnrerea.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndiZm95am11bHN2bm5tbnJlcmVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwNTA3MjcsImV4cCI6MjA2NTYyNjcyN30.iedmhF5A8grE1Giozk6pKitu1p370wHgMsfbSms_4vM"
);

async function confirmUser() {
  try {
    const email = 'freshuser@gmail.com';
    const password = 'password123';
    
    console.log('Attempting to confirm user manually...');
    
    // First, let's try to get the user details
    const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();
    
    if (listError) {
      console.error('Error listing users:', listError);
      return;
    }
    
    const user = users.find(u => u.email === email);
    if (user) {
      console.log('Found user:', user.id);
      console.log('Email confirmed at:', user.email_confirmed_at);
      
      // Try to update the user to confirm their email
      const { data: updateData, error: updateError } = await supabase.auth.admin.updateUserById(
        user.id,
        { email_confirm: true }
      );
      
      if (updateError) {
        console.error('Error updating user:', updateError);
      } else {
        console.log('User updated successfully:', updateData);
      }
    } else {
      console.log('User not found');
    }
    
    // Now try to sign in
    console.log('\nTrying to sign in...');
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      console.error('Sign in error:', signInError);
    } else {
      console.log('Sign in successful!');
      console.log('Session:', signInData.session);
    }
    
  } catch (error) {
    console.error('Script error:', error);
  }
}

confirmUser(); 