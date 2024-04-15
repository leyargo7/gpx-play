'use client'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import axios from 'axios'

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


function RedirectPay() {
  const [dataTrans, setDataTrans] = useState()
  const [dataBack, setDataBack] = useState()
  const { data: session, status } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  useEffect(() => {
    if (status === 'authenticated') {
      if (id) {
        dataWompiTransaction(id).then((data) => {
          setDataTrans(data)
        })
        
      }
    }
  }, [status, id])

  useEffect(() => {
    dataBackend().then((data) => {
      setDataBack(data)
    })

  }, [])

  const btnComprobar = async () => {
    //const res = await axios.get('/api/sandboxevent')
    //const info = res.data
    //console.log(dataBack)


    if(dataBack.data.transaction.data.transaction.status === 'APPROVED'){
      if (dataBack.user.member) {
            signOut({ redirect: false }).then(() => {
              router.push('/login')
            })
          } else {
            router.push('/register')
          }
    } else {
      router.push('/errortrans')
    }
 
    
  }

  return (
    <div className="flex items-center justify-center h-screen">
      {dataTrans &&
      (dataTrans as { data: { status: string } }).data.status === 'APPROVED' ? (
        <button onClick={btnComprobar} className="bg-indigo-500 px-4 py-2">
          Disfruta
        </button>
      ) : (
        <p>loading... </p>
      )}
    </div>
  )
}

export default RedirectPay
