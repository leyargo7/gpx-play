export {default} from "next-auth/middleware"

export const config = {
    matcher: [
        '/',
        '/dashboard',
        '/payment',
        '/redirectpay',
        '/api/sandboxevent',

        

    ]
}

// export const config = {
//     matcher: [
//         '/dashboard/:path*', <--- esto protege todas las rutas que empiecen con /dashboard
//     ]
// }