import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://celtvsaxrergeoxtduce.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlbHR2c2F4cmVyZ2VveHRkdWNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYwNTc1NjEsImV4cCI6MjAzMTYzMzU2MX0.gxjfOG3aHDMel29sZ7S-lkLeQVIvrhJOY4uS6gxj1r8'
const supabase = createClient(supabaseUrl, supabaseKey)

export const getSupabase = () => {
    return supabase
}

export const isUserLoggedIn = async () => {
    await supabase.auth.onAuthStateChange((event, session) => {
        if (!session) {
            alert('You are not logged in')
            window.location.href = '/html/login.html'
        }
    })
}
