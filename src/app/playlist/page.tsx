
import Link from 'next/link'
import axios from 'axios'
import Image from 'next/image'

// aqui se llama a la api video y se mapea para mostrar los videos

interface Video {
  _id: string
  title: string
  thumbnailUrl: string
}

const { NEXT_PUBLIC_BACKEND_URL } = process.env

const getVideos = async () => {
  try {
    const response = await axios.get(`${NEXT_PUBLIC_BACKEND_URL}/api/videos`)
    return response.data
  } catch (error) {
    console.error(error)
    return undefined
    
  }
}

async function MainVideos() {
  const dbVideos = await getVideos()

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

