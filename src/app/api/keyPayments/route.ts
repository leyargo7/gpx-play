import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

const { SECRET_INTEGRITY } = process.env
const { PRICE } = process.env

interface Pay {
  price: string
  fullname: string
  email: string
}

export async function POST(request: Request) {
  const { fullname, email }: Pay = await request.json()

  let newDataPay = {
    fullname,
    email,
    referencia: uuidv4(),
    monto: PRICE,
    moneda: 'COP',
    secretoIntegridad: SECRET_INTEGRITY,
  }

  let cadenaConcatenada =
    newDataPay.referencia +
    newDataPay.monto +
    newDataPay.moneda +
    newDataPay.secretoIntegridad

  const encondedText = new TextEncoder().encode(cadenaConcatenada)
  const hashBuffer = await crypto.subtle.digest('SHA-256', encondedText)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
  
  return NextResponse.json({ 
    reference: newDataPay.referencia,
    integrity: hashHex,
    fullname,
    email,
    monto: newDataPay.monto,
  })
}
