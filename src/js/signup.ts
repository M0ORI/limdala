import { getSupabase } from "./limdala";
const supabase = getSupabase();

document.addEventListener('DOMContentLoaded', async () => {

    const signupForm = document.getElementById('signup-form');

    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault()
            const formData = new FormData(signupForm as HTMLFormElement)
            const email = formData.get('email')
            const password = formData.get('password')
            await supabase.auth.signUp({
                email: email as string, 
                password: password as string
            }).then((response) => {
                alert('Please check your email for the confirmation link.')
                window.location.href = '/html/login.html'
            }).catch((error) => {
                alert(error.error_description || error.message)
                window.location.href = '/signup.html'
            })
        })
    }

})