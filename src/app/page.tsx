"use client"
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  fullname: string
  email: string
  member: boolean
}

function HomePage() {
  const session  = useSession()
  const [dataSession, setDataSession] = useState<User>()
  const router = useRouter()

  useEffect(() => {
    if (session.data) {
      setDataSession(session.data.user as User)
      
    }
  }, [session])

  useEffect(() => {
    if(dataSession?.member === false){
      router.push('/payment')
    }else if(dataSession?.member === true){
      router.push('/')
    }

  }, [dataSession, router])
  

  return (
    <div>
      <h1>Gpx Media</h1>

      <p>Mis videos</p>

    </div>
    
  )
}

export default HomePage