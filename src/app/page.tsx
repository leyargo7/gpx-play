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
  const { data: session, status }  = useSession()

  const router = useRouter()

  useEffect(() => {
    if (status === "authenticated") {
      if((session.user as User).member === true) {
        router.push("/")
      }else if((session.user as User).member === false){
        router.push("/payment")
      }
 
      
    }
  }, [
    status,
    session,
    router
  ])

  

  return (
    <div>
      <h1>Gpx Media</h1>

      <p>Mis videos</p>

    </div>
    
  )
}

export default HomePage