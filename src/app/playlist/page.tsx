"use client"
import Link from 'next/link'
import axios from 'axios'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

// aqui se llama a la api video y se mapea para mostrar los videos

interface Video {
  _id: string
  title: string
  thumbnailUrl: string
}
interface User {
  fullname: string
  email: string
  member: boolean
}

//const { NEXT_PUBLIC_BACKEND_URL } = process.env


const getVideos = async () => {
 
  try {
    //const response = await axios.get('http://localhost:3000/api/videos')
    const response = await axios.get('https://gpx-play.vercel.app/api/videos')
    const data = response.data
    //console.log(data)
    return data
  } catch (error) {
    //console.error(error)
    return error
    
  }
}

function MainVideos() {

  const { data: session, status } = useSession()
  const router = useRouter()
  const [dbVideos, setDbVideos] = useState<Video[]>([])

  //const dbVideos = await getVideos()
  // console.log(dbVideos)

  useEffect(() => {
    const fetchVideos = async () => {
      const videos = await getVideos()
      setDbVideos(videos)
      
    }
    fetchVideos()
  }, [status, session])
  
  if (status === 'loading') {
    return <p>Loading...</p>
  }
  if((session?.user as User).member === false){
    router.push('/payment')
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 justify-center p-4">
      {dbVideos.map((video: Video) => (
        <Link href={`/playlist/${video._id}`} key={video._id}>
          <div className="bg-purple-500 py-3 cursor-pointer rounded-md hover:bg-yellow-400 w-full h-full flex  flex-col justify-between">
            <h1 className='font-bold text-lg mb-2'>{video.title}</h1>
            <div>
            <Image
              src={video.thumbnailUrl}
              alt={video.title}
              priority={true}
              width={300}
              height={300}
              className="object-cover w-full"
            />
            </div>
          </div>
        </Link>
      ))}
    </div>
    
    
  )
}

export default MainVideos