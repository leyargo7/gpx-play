import axios from 'axios'

interface CardVideoProps {
  params: {
    id: string
  }
}

const { NEXT_PUBLIC_BACKEND_URL } = process.env

const getVideos = async (id: string) => {
  try {
    const response = await axios.get(`${NEXT_PUBLIC_BACKEND_URL}/api/videos/${id}`)
    return response.data
    
  } catch (error) {
    console.error(error)
    return undefined
    
  }
}

async function CardVideo({ params }: CardVideoProps) {
  const video = await getVideos(params.id)

  return (
    <div>
      <h1 className='font-bold ml-10 p-5'>{video.title}</h1>
      <div className="flex flex-col justify-start items-center h-screen">
        <div className="w-3/4  h-3/4">
          <iframe
            src={video.url}
            loading="lazy"
            allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;"
            allowFullScreen={true}
            className="w-full h-full border-0"
          ></iframe>
        </div>
      </div>
    </div>
  )
}
// style="position:relative;padding-top:56.25%;"
// style="border:0;position:absolute;top:0;height:100%;width:100%;"
export default CardVideo
