import { createClient } from '@supabase/supabase-js';


// Initialize Supabase client
// Using direct values from project configuration
const supabaseUrl = 'https://ppmcrtrylxrsbqprwzsa.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwbWNydHJ5bHhyc2JxcHJ3enNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2Njg1NjgsImV4cCI6MjA2NTI0NDU2OH0.fs1YM8iijj1n8hiwoa0EkKNx1QZ46dhbSvr8oGHO5po';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };