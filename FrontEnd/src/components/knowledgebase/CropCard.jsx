import { Link } from 'react-router-dom'

const CropCard = ({ crop }) => {
  return (
    <div className="max-w-sm rounded-lg bg-darkbg overflow-hidden shadow-lg text-white">
      <Link to={`/crops/${crop._id}`}>
        <img className="h-48 w-96 object-cover"
             src={crop.cropImage} 
             alt={crop.cropName} 
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{crop.cropName}</div>
          <p className="text-gray-300 mb-2">Scientific name: <span className="italic">{crop.scientificName}</span></p>
          <p className="text-gray-300 mb-2">Family name: {crop.cropFamily}</p>
          <p className="text-gray-300 mb-2">Crop type: {crop.cropType}</p>
        </div>
      </Link>
    </div>
  )
}

export default CropCard
