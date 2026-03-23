import { serve } from 'bun'
import { hostname } from 'os';

serve ({ 
    fetch(req) { 
        const url = new URL(request.url);
        if (url.pathname === '/') {
            return new Response("ta bien", { status: 200 })
        } else if (url.pathname === '/login') {
            return new Response("ta bien el logimn", { status: 200 })
        } else { 
            return new Response("mal", {status:400})
        }
    },
    port : 3000,
    hostname :'127.0.0.1'
})