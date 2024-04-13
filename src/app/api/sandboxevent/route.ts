import { NextResponse } from 'next/server'
import { connectDB } from '@/libs/mongodb'
import User from '@/models/user'
import Transaction from '@/models/transactions'
import crypto from 'crypto'

const { KEY_PRIVATE } = process.env

function hash(data: string) {
  return crypto.createHash('sha256').update(data).digest('hex')
}

export async function POST(request: Request) {
  await connectDB()
  const data = await request.json()
  console.log(data)

  //firma asimetrica
  /*let cadena =
    data.transaction.id +
    data.transaction.status +
    data.transaction.amount_in_cents +
    timestamp +
    KEY_PRIVATE

  const hashHex = hash(cadena)
  
  if (hashHex === signature.checksum) {
    const newTransaction = await new Transaction({
      transaction: data,
    }).save()

    //en la request viene el correo para saber que usuario es
    //ir a la db user y actualizar la propiedad member de este usuario a true
    try {
        const user = await User.findOneAndUpdate(
            {
              email: data.transaction.customer.email,
            },
            {
              member: true,
            }
          )
    } catch (error) {
        console.log(error)
    }
    
  }
  //console.log(data.transaction.customer_email)*/

  return NextResponse.json({ message: 'Hello, World!' })
}

export async function GET(request: Request) {
  await connectDB()

  const data = await Transaction.findOne().sort({ _id: -1 })
  //console.log(data.transaction.signature.properties[2]);
  console.log(data.transaction.data.transaction.id)
  return NextResponse.json(data)
}
