
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

    document.getElementById('userName')?.addEventListener('mouseover', function() {
        document.getElementById('myDropdown')?.classList.add('show');
    });
    
    document.getElementById('userName')?.addEventListener('mouseout', function() {
        setTimeout(() => {
            if (!document.querySelector('#myDropdown:hover')) {
                document.getElementById('myDropdown')?.classList.remove('show');
            }
        }, 200);
    });
    
    document.getElementById('myDropdown')?.addEventListener('mouseover', function() {
        this.classList.add('show');
    });
    
    document.getElementById('myDropdown')?.addEventListener('mouseout', function() {
        this.classList.remove('show');
    });
    
})

