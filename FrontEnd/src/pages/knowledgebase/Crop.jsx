import { useState, useEffect } from 'react'
import { getCropById } from '../../api/knowlegdebase'
import { useParams } from 'react-router-dom'


const Crop = () => {
  const { id } = useParams()
  const [crop, setCrop] = useState({})

  console.log("id", id)

  useEffect(() => {
    try{
      const fetchCrop = async () => {
        const crop = await getCropById(id)
        setCrop(crop)
        console.log("crop by id", crop)
      }
      fetchCrop()
    } catch (error) {
      console.log('error', error)
    }
  }, [id])

  console.log('crop', crop)

  return (
    <div>
      {/* mobile view */}
      <div className=" md:hidden bg-darkbg text-white overflow-hidden w-full mx-auto">
        <img
          className="w-full h-64 object-cover object-center"
          src={crop.cropImage}
          alt={crop.cropName}
        />
        <div className="py-4 px-6">
          <h1 className="text-3xl font-semibold mb-3">{crop.cropName}</h1>
          <p className="text-gray-300 leading-relaxed mb-3">Scientific Name: {crop.scientificName}</p>
          <p className="text-gray-300 leading-relaxed mb-3">Crop Family: {crop.cropFamily}</p>
          <p className="text-gray-300 leading-relaxed mb-3">Crop Type: {crop.cropType}</p>
          <p className="text-gray-300 leading-relaxed mb-3">Crop Introduction: {crop.cropIntro}</p>
        </div>
      </div>

      {/* desktop view */}
      <div className="hidden md:block bg-darkbg text-white overflow-hidden mx-auto md:rounded-xl md:mx-36 md:my-10">
        <div className="grid grid-cols-2 lg:grid-cols-[1fr,2fr]" >
          <div className="col-span-1">
            <img
              className="w-full h-80 object-cover object-center"
              src={crop.cropImage}
              alt={crop.cropName}
            />
          </div>
          <div className="col-span-1">
            <div className="py-4 px-6 flex flex-col justify-center h-full">
              <h1 className="text-3xl font-semibold mb-3">{crop.cropName}</h1>
              <p className="text-gray-300 leading-relaxed mb-3">Scientific Name: {crop.scientificName}</p>
              <p className="text-gray-300 leading-relaxed mb-3">Crop Family: {crop.cropFamily}</p>
              <p className="text-gray-300 leading-relaxed mb-3">Crop Type: {crop.cropType}</p>
              <p className="text-gray-300 leading-relaxed mb-3">Crop Introduction: {crop.cropIntro}</p>
            </div>
          </div>
        </div>
      </div>

    {crop.cropInfo && (
    <div className="bg-lightbg text-white overflow-hidden mx-auto md:rounded-xl md:mx-36 md:my-10 md:bg-darkbg">
      <div className="py-5 px-6 lg:p-10">
        <h1 className="text-xl font-semibold mb-3">Crop Climate </h1>
        <p className="text-gray-300 leading-relaxed mb-5">{crop.cropInfo.climate}</p>
        <h1 className="text-xl font-semibold mb-3">Crop Season </h1>
        <p className="text-gray-300 leading-relaxed mb-5">{crop.cropInfo.season}</p>
        <h1 className="text-xl font-semibold mb-3">Seed Type </h1>
        <p className="text-gray-300 leading-relaxed mb-5">{crop.cropInfo.seedType}</p>
        <h1 className="text-xl font-semibold mb-3">Soil Type </h1>
        <p className="text-gray-300 leading-relaxed mb-5">{crop.cropInfo.soil}</p>
        <h1 className="text-xl font-semibold mb-3">Field Preparation </h1>
        <p className="text-gray-300 leading-relaxed mb-5">{crop.cropInfo.fieldPreparation}</p>
        <h1 className="text-xl font-semibold mb-3">Fertilizer </h1>
        <p className="text-gray-300 leading-relaxed mb-5">{crop.cropInfo.fertilizer}</p>
        <h1 className="text-xl font-semibold mb-3">Irrigation </h1>
        <p className="text-gray-300 leading-relaxed mb-5">{crop.cropInfo.irrigation}</p>
        <h1 className="text-xl font-semibold mb-3">Weed Control </h1>
        <p className="text-gray-300 leading-relaxed mb-5">{crop.cropInfo.weedControl}</p>
        <h1 className="text-xl font-semibold mb-3">Pest Control </h1>
        <p className="text-gray-300 leading-relaxed mb-5">{crop.cropInfo.pestControl}</p>
        <h1 className="text-xl font-semibold mb-3">Harvesting </h1>
        <p className="text-gray-300 leading-relaxed mb-5">{crop.cropInfo.harvesting}</p>
        <h1 className="text-xl font-semibold mb-3">Yield </h1>
        <p className="text-gray-300 leading-relaxed mb-5">{crop.cropInfo.yield}</p>
        <h1 className="text-xl font-semibold mb-3">Storage </h1>
        <p className="text-gray-300 leading-relaxed mb-5">{crop.cropInfo.storage}</p>
        <h1 className="text-xl font-semibold mb-3">Other Information </h1>
        <p className="text-gray-300 leading-relaxed mb-5">{crop.otherInfo}</p>
      </div>
    </div>
    )}
    </div>
  )
}

export default Crop