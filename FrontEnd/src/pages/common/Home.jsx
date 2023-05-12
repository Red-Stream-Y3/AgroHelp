import { useState, useEffect } from 'react'
import { getAllCropsShort, getRandomDiseases } from '../../api/knowlegdebase'
import { CropCard, DiseaseCard, Loader } from '../../components'
import { FaChevronCircleLeft, FaChevronCircleRight } from 'react-icons/fa'

const Home = () => {

  const [crops, setCrops] = useState([])
  const [diseases, setDiseases] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentcrop , setCurrentCrop] = useState(0)
  const [currentdisease , setCurrentDisease] = useState(0)
  const [isFade, setIsFade] = useState(false)

  const handleNextClickCrop = () => {
    setIsFade(true);
    setTimeout(() => {
      setCurrentCrop(currentcrop === crops.length - 1 ? 0 : currentcrop + 1);
      setIsFade(false);
    }, 300);
  };

  const handlePrevClickCrop = () => {
    setIsFade(true);
    setTimeout(() => {
      setCurrentCrop(currentcrop === 0 ? crops.length - 1 : currentcrop - 1);
      setIsFade(false);
    }, 300);
  };

  const handleNextClickDisease = () => {
    setIsFade(true);
    setTimeout(() => {
      setCurrentDisease(currentdisease === diseases.length - 1 ? 0 : currentdisease + 1);
      setIsFade(false);
    }, 300);
  };

  const handlePrevClickDisease = () => {
    setIsFade(true);
    setTimeout(() => {
      setCurrentDisease(currentdisease === 0 ? diseases.length - 1 : currentdisease - 1);
      setIsFade(false);
    }, 300);
  };

  const animateStyle = {
    opacity: isFade ? 0 : 1,
    transition: "opacity 300ms ease-in-out",
  };

  useEffect(() => {
    const fetchCrops = async () => {
      const crops = await getAllCropsShort()
      setCrops(crops)
      console.log("crops", crops)
      setIsLoading(false)
    }
    fetchCrops()
  }, [])

  useEffect(() => {
    const fetchDisease = async () => {
      const disease = await getRandomDiseases()
      setDiseases(disease)
      console.log("disease", disease)
      setIsLoading(false)
    }
    fetchDisease()
  }, [])

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Loader />
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-start place-items-start py-5 px-8 ml-0 mr-auto w-full">
          <h1 className="text-2xl text-white font-bold md:text-3xl">Featured Crops</h1>
          <p className="text-gray-300 text-md md:text-lg">Learn about different crops and their growing conditions</p>
          <hr className="border-gray-500 border-1 w-full mt-4" />
        </div>
        {/* mobile carousal */}
        <div className="relative">
          <div className="flex flex-wrap justify-center md:hidden">
            <div className="m-5">
              <CropCard crop={crops[currentcrop]} style={animateStyle} />
            </div>
            <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
              <FaChevronCircleLeft className="text-3xl text-white cursor-pointer" onClick={handlePrevClickCrop} />
            </div>
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <FaChevronCircleRight className="text-3xl text-white cursor-pointer" onClick={handleNextClickCrop} />
            </div>
          </div>
        </div>

        {/* desktop */}
        <div className="hidden md:flex flex-wrap justify-center">
          {crops.map((crop) => (
            <div className="m-4" key={crop._id}>
              <CropCard crop={crop} />
            </div>
          ))}
        </div>
      </div>
    
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-start place-items-start py-5 px-8 ml-0 mr-auto w-full">
          <h1 className="text-2xl text-white font-bold md:text-3xl">Featured Diseases</h1>
          <p className="text-gray-300 text-md md:text-lg">Learn about different diseases and their symptoms</p>
          <hr className="border-gray-500 border-1 w-full mt-4" />
        </div>
        {/* mobile carousal */}
        <div className="relative">
          <div className="flex flex-wrap justify-center md:hidden">
            <div className="m-5">
              <DiseaseCard disease={diseases[currentdisease]} style={animateStyle} />
            </div>
            <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
              <FaChevronCircleLeft className="text-3xl text-white cursor-pointer" onClick={handlePrevClickDisease} />
            </div>
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <FaChevronCircleRight className="text-3xl text-white cursor-pointer" onClick={handleNextClickDisease} />
            </div>
          </div>
        </div>

        {/* desktop */}
        <div className="hidden md:flex flex-wrap justify-center">
          {diseases.map((disease) => (
            <div className="m-4" key={disease._id}>
              <DiseaseCard disease={disease} />
            </div>
          ))}
        </div>
      </div>
    </div>

  )
}

export default Home