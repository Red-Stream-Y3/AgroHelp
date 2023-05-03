import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getDiseaseById } from '../../api/knowlegdebase'

const Disease = () => {
  const { id } = useParams()
  const [disease, setDisease] = useState({})

  useEffect(() => {
    try {
        const fetchDisease = async () => {
            const disease = await getDiseaseById(id)
            setDisease(disease)
            console.log("disease by id", disease)
        }
        fetchDisease()
    } catch (error) {
        console.log('error', error)
    }
  }, [id])

  console.log('disease', disease)

  return (
    <div>
        
        {/* mobile view */}
        <div className=" md:hidden bg-darkbg text-white overflow-hidden w-full mx-auto">
            {disease.diseaseImage && (
                <img
                    className="w-full h-64 object-cover object-center"
                    src={disease.diseaseImage[0]}
                    alt={disease.diseaseName}
                />
            )}
            <div className="py-4 px-6">
                <h1 className="text-3xl font-semibold mb-3">{disease.diseaseName}</h1>
                <p className="text-gray-300 leading-relaxed mb-3">Affected Crops:
                    {disease.diseaseCrops && (
                        disease.diseaseCrops.map((crop, index) => (
                            <span key={index}> {crop},</span>
                        ))
                    )}
                </p>
                <p className="text-gray-300 leading-relaxed mb-3">Disease Type: {disease.diseaseType}</p>
                <p className="text-gray-300 leading-relaxed mb-3">Disease Status: {disease.diseaseStatus}</p>
            </div>
        </div>

        {/* desktop view */}
        <div className="hidden md:block bg-darkbg text-white overflow-hidden mx-auto md:rounded-xl md:mx-36 md:my-10">
            <div className="grid grid-cols-2 lg:grid-cols-[1fr,2fr]" >
                <div className="col-span-1">
                    {disease.diseaseImage && (
                        <img
                            className="w-full h-80 object-cover object-center"
                            src={disease.diseaseImage[0]}
                            alt={disease.diseaseName}
                        />
                    )}
                </div>
                <div className="col-span-1">
                    <div className="py-4 px-6 flex flex-col justify-center h-full">
                        <h1 className="text-3xl font-semibold mb-3">{disease.diseaseName}</h1>
                        <p className="text-gray-300 leading-relaxed mb-3">Affected Crops:
                                {disease.diseaseCrops && (
                                    disease.diseaseCrops.map((crop, index) => (
                                        <span key={index}> {crop},</span>
                                    ))
                                )}
                        </p>
                        <p className="text-gray-300 leading-relaxed mb-3">Disease Type: {disease.diseaseType}</p>
                        <p className="text-gray-300 leading-relaxed mb-3">Disease Status: {disease.diseaseStatus}</p>
                    </div>
                </div>
            </div>
        </div>

        {/* description */}
        <div className="bg-lightbg text-white overflow-hidden mx-auto md:rounded-xl md:mx-36 md:my-10 md:bg-darkbg">
            <div className="py-5 px-6 lg:p-10">
                <h1 className="text-xl font-semibold mb-3">Disease Cause </h1>
                <p className="text-gray-300 leading-relaxed mb-5">{disease.diseaseCause}</p>
                <h1 className="text-xl font-semibold mb-3">Disease Symptoms </h1>
                <p className="text-gray-300 leading-relaxed mb-5">{disease.diseaseSymptoms}</p>
                <h1 className="text-xl font-semibold mb-3">Disease Prevention </h1>
                <p className="text-gray-300 leading-relaxed mb-5">{disease.diseasePrevention}</p>
                <h1 className="text-xl font-semibold mb-3">Disease Treatment </h1>
                <p className="text-gray-300 leading-relaxed mb-5">{disease.diseaseTreatment}</p>
                <h1 className="text-xl font-semibold mb-3">Disease Images </h1>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {disease.diseaseImage && (
                        disease.diseaseImage.map((image, index) => (
                            <img
                                key={index}
                                className="w-full h-80 object-cover object-center rounded-lg"
                                src={image}
                                alt={disease.diseaseName}
                            />
                        ))
                    )}
                </div>

            </div>
        </div>

    </div>
  )
}

export default Disease