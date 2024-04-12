'use client'
import axios, { AxiosError } from 'axios'
import FormPay from '@/components/FormPay'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { set } from 'mongoose'

interface User {
  fullname: string
  email: string
  member: boolean
}

interface PayData {
  reference: string
  integrity: string
  fullname: string
  email: string
  monto: string
}



function Payment() {

  //payData estado datos del usuario que esta pagando
  const [payData, setPayData] = useState<PayData | null>(null)
  const [error, setError] = useState()
  const [isPayActive, setIsPayActive] = useState(false)
  const router = useRouter()
  const { data: session } = useSession()

  const handle = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    try {
      const res = await axios.post('/api/keyPayments', {
        fullname: formData.get('fullname'),
        email: formData.get('email'),
      })
  
      if (res?.status === 200) {
        setPayData(res.data)
        //console.log(res.data)
      }
      setIsPayActive(true)
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data.message)
      }
    }
  }
  
  return (
    <div className="justify-center h-[calc(100vh-4rem)] flex items-center">
      <form onSubmit={handle}>
        <h1 className="text-4xl font-bold mb-7">Completa tu suscripción!</h1>
        <input
          type="text"
          name="fullname"
          placeholder="Nombre completo"
          className="bg-zinc-800 px-4 py-2 block mb-2 w-full"
          defaultValue={(session?.user as User)?.fullname || ''}
        />
        <input
          type="email"
          name="email"
          placeholder="correo electrónico"
          className="bg-zinc-800 px-4 py-2 block mb-2 w-full"
          defaultValue={session?.user?.email || ''}
        />
        <button className="bg-indigo-500 px-4 py-2">Continuar</button>
      </form>
      {isPayActive && payData && <FormPay {...payData} />}
    </div>
  )
}

export default Payment
