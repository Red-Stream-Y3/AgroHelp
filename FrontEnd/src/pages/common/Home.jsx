import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAllCropsShort } from '../../api/knowlegdebase'
import { CropCard } from '../../components'

const Home = () => {

  const [crops, setCrops] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCrops = async () => {
      const crops = await getAllCropsShort()
      setCrops(crops)
      console.log("crops", crops)
      setIsLoading(false)
    }
    fetchCrops()
  }, [])


  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-start place-items-start py-5 px-8 ml-0 mr-auto w-full">
          <h1 className="text-2xl text-white font-bold md:text-3xl">Featured Crops</h1>
          <p className="text-gray-300 text-md md:text-lg">Learn about different crops and their growing conditions</p>
          <hr className="border-gray-500 border-1 w-full mt-4" />
        </div>
        <div className="flex flex-wrap justify-center">
          {crops.map((crop) => (
            <div className="m-4" key={crop._id}>
              <CropCard crop={crop} />
            </div>
          ))}
        </div>
      </div>
    </div>

  )
}

export default Home