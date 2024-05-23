
import { getSupabase } from "./limdala"
const supabase = getSupabase()

document.addEventListener('DOMContentLoaded', async () => {

    const loginForm = document.getElementById('login-form')

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault()
            const formData = new FormData(loginForm as HTMLFormElement)
            const email = formData.get('email')
            const password = formData.get('password')
            await supabase.auth.signInWithPassword({
                email: email as string,
                password: password as string,
            }).then((response) => {
                window.location.href = '/home.html'
            }).catch((error) => {
                alert(error.error_description || error.message)
                window.location.href = '/login.html'
            })
        }
    )}
    
})