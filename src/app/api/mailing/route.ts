import { NextResponse } from 'next/server'
import sgMail from '@sendgrid/mail'
const { SG_API_KEY } = process.env

if (SG_API_KEY) {
  sgMail.setApiKey(SG_API_KEY)
}

export async function POST(request: Request) {
  const { name, email, message } = await request.json()

  try {
    const msg = {
      to: 'leyargo@hotmail.com',
      from: 'gopraxisco@gmail.com',
      subject: 'Ticket concierto',
      html: `<p><strong>Name: </strong>${name}</p>
            <p><strong>Email: </strong>${email}</p>
            <p><strong>Message: </strong>${message}</p>
    
            `,
    }
    await sgMail.send(msg)


    return NextResponse.json({ message: 'email send' })
  } catch (error) {
    
    return NextResponse.json({ message: error })
  }
}
