
import { getSupabase } from "./limdala"
const supabase = getSupabase()


import { isUserLoggedIn } from "./limdala";

document.addEventListener('DOMContentLoaded', async () => {
    isUserLoggedIn()
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
        const userHtml = document.getElementById('userName');
        if (userHtml) userHtml.innerHTML = user?.email?.split('@')[0] ?? ''
    } 
})

