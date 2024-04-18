import { NextResponse } from 'next/server'
import { connectDB } from '@/libs/mongodb'
import Video from '@/models/videos'

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    await connectDB()
    try {
        const user = await Video.findById(params.id)
        return NextResponse.json(user)
    } catch (error) {
        return NextResponse.json({ error: error}, { status: 500 })
    }
}
