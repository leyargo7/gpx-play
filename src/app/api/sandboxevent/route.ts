import { NextResponse } from 'next/server'
import { connectDB } from '@/libs/mongodb'
import Transaction from '@/models/transactions'
import User from '@/models/user'
import crypto from 'crypto'

const { KEY_EVENTS } = process.env

export async function POST(request: Request) {
  await connectDB()

  const { transaction } = await request.json()

  if (transaction) {
    const newTransaction = await new Transaction({
      transaction: transaction,
    }).save()
  }
  return NextResponse.json({ message: 'Hello, World!' })
}

function hash(data: string) {
  return crypto.createHash('sha256').update(data).digest('hex')
}

// --------------------------------------------------------GET

export async function GET() {
  await connectDB()

  try {
    const data = await Transaction.findOne().sort({ _id: -1 })

    let cadena =
      data.transaction.data.transaction.id +
      data.transaction.data.transaction.status +
      data.transaction.data.transaction.amount_in_cents +
      data.transaction.timestamp +
      KEY_EVENTS

    const integrity = hash(cadena)

    const checksumWompi = data.transaction.signature.checksum

    if (integrity === checksumWompi) {
      try {
        const user = await User.findOneAndUpdate(
          {
            email: data.transaction.data.transaction.customer_email,
          },
          {
            member: true,
          }
        )

        return NextResponse.json({user, data})

      } catch (error) {
        console.log(error)
      }
    } else {
        console.log('Error')
        return NextResponse.json({ message: 'Error' })
    }

    //return NextResponse.json(data)
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Error' })
  }
}
