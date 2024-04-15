'use client'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Suspense, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
//import { useSearchParams } from 'next/navigation'
import axios from 'axios'
import { set } from 'mongoose'

interface User {
  member: boolean
  fullname: string
  email: string
}

const dataWompiTransaction = async (id: string) => {
  const response = await axios.get(
    `https://sandbox.wompi.co/v1/transactions/${id}`
  )
  return response.data
}

const dataBackend = async () => {
  const response = await axios.get('/api/sandboxevent')
  return response.data
}
//-------------------------------------------------------------------
function RedirectPay({ searchParams }: any) {
  const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState<string[]>([])
  const [dataTrans, setDataTrans] = useState()
  const [dataBack, setDataBack] = useState()
  const { data: session, status } = useSession()
  const router = useRouter()
  //const searchParams = useSearchParams()
  const id = searchParams.id

  useEffect(() => {
    if (status === 'authenticated') {
      if (id) {
        dataWompiTransaction(id).then((data) => {
          setDataTrans(data)
          console.log('ok1')
        })
      }
    }
  }, [status, id])

  useEffect(() => {
    //let a = (dataTrans as any)?.data?.created_at
    //let dt = new Date(a)
    //console.log(dt.toLocaleString())
    //console.log(dt)
    if (
      dataTrans &&
      (dataTrans as { data?: { status: string } })?.data?.status !== 'APPROVED'
    ) {
      setErrors(['Transacción Declinada'])
    } else {
      dataBackend().then((data) => {
        setDataBack(data)
        console.log('ok2')
      })
    }
  }, [dataTrans]) // Include 'dataTrans' in the dependency array

  const btnComprobar = async () => {
    //const res = await axios.get('/api/sandboxevent')
    //const info = res.data
    //console.log(dataBack)

    try {
      if (
        (dataBack as any)?.data?.transaction?.data?.transaction?.status ===
        'APPROVED'
      ) {
        if ((dataBack as any)?.user?.member) {
          signOut({ redirect: false }).then(() => {
            router.push('/login')
          })
        } else {
          router.push('/register')
        }
      } else {
        router.push('/errortrans')
      }
    } catch (error) {
      console.log(error)
      setErrors(['Error'])
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen text-white">
      
        {dataBack && (
          <div>
            <p className="text-2xl font-bold">Estado: {(dataTrans as any)?.data?.status ?? ''}</p>
            <p className="text-2xl font-bold">Fecha: {(dataTrans as any)?.data?.created_at ?? ''}</p>
            <p className="text-2xl font-bold">Fecha de finalizacion: {(dataTrans as any)?.data?.finalized_at ?? ''}</p>
            <p className="text-2xl font-bold">Transaccion: {(dataTrans as any)?.data?.id ?? ''}</p>
            <p className="text-2xl font-bold">Metodo pago: {(dataTrans as any)?.data?.payment_method.type ?? ''}</p>
            {
              (dataBack as any)?.data?.transaction?.data?.transaction?.status ===
              'APPROVED' ? (
                <button onClick={btnComprobar} className="bg-indigo-500 px-4 py-2">
              Inicia Sesión para Disfrutar!
            </button>) : (
              <Link href='/errortrans'>
                Escribir a Soporte
              </Link>
             )

            }
          </div>
        )
        
        }

      {errors.map((error) => (
        <div key={error} className="bg-red-500 text-white p-2 mb-2">
          {error}
        </div>
      ))}
    </div>
  )
}

export default RedirectPay
