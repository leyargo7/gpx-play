'use client'
import axios, {AxiosError} from 'axios'
import { FormEvent, useState } from 'react'
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function RegisterPage() {

  const [error, setError] = useState();
  const router = useRouter();


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    try {
      const signupResponse = await axios.post('/api/auth/signup', {
        email: formData.get('email'),
        password: formData.get('password'),
        fullname: formData.get('fullname'),
      })

      //res next auth
      const res = await signIn('credentials', {
        email: signupResponse.data.email,
        password: formData.get('password'),
        redirect: false
      })

      if(res?.ok){
        router.push('/')
      }

    } catch (error) {
      if(error instanceof AxiosError){
        setError(error.response?.data.message)
      }
    }
  }

  return (
    <div className='justify-center h-[calc(100vh-4rem)] flex items-center'>
      <form onSubmit={handleSubmit} className='bg-neutral-950 px-8 py-10 w3/12'>
      {
        error && <div className="bg-red-500 text-white p-2 mb-2">{error}</div>
      }
        <h1 className='text-4xl font-bold mb-7'>Crea tu cuenta</h1>
        <input
          type="text"
          name="fullname"
          placeholder="John Doe"
          className="bg-zinc-800 px-4 py-2 block mb-2 w-full"
        />
        <input
          type="email"
          name="email"
          placeholder="someemail@gmail.com"
          className="bg-zinc-800 px-4 py-2 block mb-2 w-full"
        />
        <input
          type="password"
          name="password"
          placeholder="********"
          className="bg-zinc-800 px-4 py-2 block mb-2 w-full"
        />

        <button className="bg-indigo-500 px-4 py-2">Register</button>
        <p className="mt-4">
          Ya tienes una cuenta? <Link href="/login" className="text-indigo-500">Entra</Link>
        </p>
      </form>
    </div>
  )
}

export default RegisterPage
