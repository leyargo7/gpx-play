'use client'

import CrearVideo from '@/components/CrearVideo'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface User {
  member: boolean
  fullname: string
  email: string
  admin: boolean 
}

function AdminVideos() {


    const { data: session, status } = useSession()
    const router = useRouter()

    if (status === 'loading') {
        return <p>Loading...</p>
    }

    if ((session?.user as User).admin !== true) {
        return router.push('/login')
    }

  return (
    <div>
      <h1>Crear Video</h1>
      <CrearVideo />
    </div>
  )
}

export default AdminVideos