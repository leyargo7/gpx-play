export {default} from "next-auth/middleware"

export const config = {
    matcher: [
        '/',
        '/payment',
        '/redirectpay',
        '/api/sandboxevent',
        '/dashboard',

        

    ]
}

// export const config = {
//     matcher: [
//         '/dashboard/:path*', <--- esto protege todas las rutas que empiecen con /dashboard
//     ]
// }