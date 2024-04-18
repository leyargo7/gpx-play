'use client'

import { FormEvent, useEffect, useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import style from '@/app/login/login.module.css'

function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const { data: session } = useSession()
  
  useEffect(() => {
    if(session){
      router.push('/')
    }
  }, [session, router])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)

    const res = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false,
    })

    if (res?.error) {
      setIsLoading(false)
      return setError(res.error as string)
    }
    if (res?.ok) return router.push('/playlist')
  }

  return (
    <div className='justify-center h-[calc(100vh-4rem)] flex items-center'>
      <form onSubmit={handleSubmit} className='bg-neutral-950 px-8 py-10 w3/12'>
        {error && <div className="bg-red-500 text-white p-2 mb-2">{error}</div>}

        <h1 className='text-4xl font-bold mb-7'>Entra!</h1>

        <input
          type="email"
          name="email"
          placeholder="tu email"
          className="bg-zinc-800 px-4 py-2 block mb-2 w-full"
        />
        <input
          type="password"
          name="password"
          placeholder="********"
          className="bg-zinc-800 px-4 py-2 block mb-2 w-full"
        />

        {
          isLoading ? (
            <div className={style.ldsripple}><div></div><div></div></div>
          ) : (
            <button className="bg-indigo-500 px-4 py-2 mt-4">Login</button>
          )
        }
 

        <p className="mt-4">
          No tienes cuenta? <Link href="/register" className="text-indigo-500">Regístrate</Link>
        </p>
      </form>
    </div>
  )
}

export default LoginPage
