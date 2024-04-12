"use client"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

interface User {
  member: boolean
  fullname: string
  email: string
}

function RedirectPay() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "authenticated"){
      if((session.user as User).member === false){
        router.push('/payment')
      } else if((session.user as User).member === true){
        router.push('/')
      }
    }
  }, [
    status,
    session,
    router
  ])

  return (
    <div className="flex items-center justify-center h-screen">
      <Link href='/'>
        <button className="bg-indigo-500 px-4 py-2">Disfruta</button>
      </Link>
    </div>
  )
}

export default RedirectPay