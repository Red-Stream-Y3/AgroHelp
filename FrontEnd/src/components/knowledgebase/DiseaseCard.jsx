import { Link } from 'react-router-dom'

const DiseaseCard = ({ disease }) => {
  return (
    <div className="max-w-sm rounded-lg bg-darkbg overflow-hidden shadow-lg text-white">
      <Link to={`/diseases/${disease._id}`}>
        <img className="h-48 w-96 object-cover"
             src={disease.diseaseImage[0]}
             alt={disease.diseaseName} 
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{disease.diseaseName}</div>
          <p className="text-gray-300 mb-2">Affected Crops: 
            {disease.diseaseCrops.map((crop, index) => (
                <span key={index}> {crop},</span>
            ))}
          </p>
          <p className="text-gray-300 mb-2">Disease Type: {disease.diseaseType}</p>
          <p className="text-gray-300 mb-2">Disease Status: {disease.diseaseStatus}</p>
        </div>
      </Link>
    </div>
  )
}

export default DiseaseCard