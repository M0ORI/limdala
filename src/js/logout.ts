
import { getSupabase } from "./limdala"
const supabase = getSupabase()


document.addEventListener('DOMContentLoaded', async () => {
    const logoutLink = document.getElementById('logoutLink')
    if (logoutLink) {
        logoutLink.addEventListener('click', async () => {
            console.log('logging out')
            await supabase.auth.signOut()
            window.location.href = '/'
        })
    }
})