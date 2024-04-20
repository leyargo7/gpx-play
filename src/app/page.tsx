'use client'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import axios from 'axios'
import style from '@/app/page.module.css'

interface User {
  _id: string
  fullname: string
  email: string
  member: boolean
}

// const getUser = async (id: string) => {
//   const response = await axios.get(`/api/users/${id}`)
//   return response.data
// }

function HomePage() {
  // const { data: session, status } = useSession()
  // const [isLoading, setIsLoading] = useState(false)

  // const router = useRouter()

  // useEffect(() => {
  //   if (status !== 'loading') {
  //     if (session === null) {
  //       router.push('/login')
  //     } else if ((session?.user as User).member === false) {
  //       router.push('/payment')
  //     }
  //   }
  // }, [status, session, router])

  // if (status === 'loading') {
  //   return <p>Loading...</p>
  // }

  return (
    <div
      className="h-screen flex justify-center items-center text-center"
      style={{
        backgroundImage:
          'url(https://res.cloudinary.com/dt4zuwjdg/image/upload/v1713393104/imageGpx/Sala_A_tjns69.jpg)',
        backgroundSize: '800px, 600px',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
      }}
    >
      <Link href="/playlist">
        <button className="bg-cyan-600 px-7 py-4 rounded-lg font-bold text-black cursor-pointer hover:bg-orange-600">
          Go to VideoList
        </button>
      </Link>
    </div>
  )
}

export default HomePage
