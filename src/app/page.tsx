'use client'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

interface User {
  _id: string
  fullname: string
  email: string
  member: boolean
}

const getUser = async (id: string) => {
  const response = await axios.get(`/api/users/${id}`)
  return response.data

 }

function HomePage() {
  const { data: session, status} = useSession()

  const router = useRouter()

  useEffect(() => {
    if (status !== 'loading') {
      if(session === null) {
        router.push('/login')
      } else if((session?.user as User).member === false) {
        router.push('/payment')
      }
    }
  }, [status, session, router]);

  if (status === 'loading') {
    return <p>Loading...</p>
  }



  return (
    <div>
      <h1>Gpx Media</h1>

      <p>Mis videos</p>
    </div>
  )
}

export default HomePage
