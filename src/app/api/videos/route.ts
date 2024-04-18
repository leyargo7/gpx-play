import { NextResponse } from 'next/server'
import { connectDB } from '@/libs/mongodb'
import Video from '@/models/videos'

// obtener todos los videos
export async function GET() {
  await connectDB()

  try {
    const videos = await Video.find()
  
    return NextResponse.json(videos)
    
  } catch (error) {
    if (error) {
      return NextResponse.json(error
      )
    }
    
  }

}

export async function POST(request: Request) {
  try {
    await connectDB()
    const data = await request.json()

    const video = new Video(data)
    const saveVideo = await video.save()
    return NextResponse.json({ message: 'Video created' })
  } catch (error) {
    return NextResponse.json(
      { message: 'Error creating video' },
      { status: 500 }
    )
  }
}

/*
estructura video

title
description
url
imageUrl
category

*/
