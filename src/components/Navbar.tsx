'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { useEffect, useState } from 'react'

interface User {
  fullname: string
  email: string
  member: boolean
}



const Navbar = () => {
  const { data: session, status } = useSession()
  const router = useRouter()

  const [name, setName] = useState<string | undefined>()

  useEffect(() => {
    if (status === 'authenticated') {
      setName((session.user as User).fullname)
    }
  }, [status, session])


  return (
    <nav className="bg-zinc-900 p-4">
      <div className="flex justify-between container mx-auto">
        <Link href="/">
          <h1 className="font-bold text-xl">GoPraxis</h1>
        </Link>

        <ul className="flex gap-x-2">
          {session ? (
            <>
              <li className="px-3 py-1">{name}</li>
              {/* <li className="px-3 py-1">
                <Link href="/dashboard">Admin</Link>
              </li> */}
              <button onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => 
                signOut({redirect:false}).then(()=>{
                  router.push('/')
                })}>Log Out</button>
            </>
          ) : (
            <>
              {/* <li className="px-3 py-1">
                <Link href="/about">Acerca de</Link>
              </li> */}
              <li className="px-3 py-1">
                <Link href="/login">Iniciar Sesion</Link>
              </li>
              <li className="px-3 py-1">
                <Link href="/register">Registro</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
