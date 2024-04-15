import { NextResponse } from 'next/server'
import { connectDB } from '@/libs/mongodb'
import User from '@/models/user'

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    await connectDB()
    try {
        const user = await User.findById(params.id)
        return NextResponse.json(user)
    } catch (error) {
        return NextResponse.json({ error: error}, { status: 500 })
    }
}
