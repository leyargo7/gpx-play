export {default} from "next-auth/middleware"

export const config = {
    matcher: [
        '/admin/:path*',
        '/payment',
        '/redirectpay/:path*',
        '/dashboard',
        '/playlist/:path*',
        '/occupated'
    ]
}

// export const config = {
//     matcher: [
//         '/dashboard/:path*', <--- esto protege todas las rutas que empiecen con /dashboard
//     ]
// }