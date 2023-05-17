import { Link } from 'react-router-dom';

const CropCard = ({ crop }) => {
  return (
    <div className="max-w-sm rounded-lg bg-darkbg overflow-hidden shadow-lg text-white transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-20 cursor-pointer">
      {crop && crop.isAccepted && (
        <Link to={`/crop/${crop._id}`}>
          <img
            className="h-48 w-96 object-cover"
            src={crop.cropImage}
            alt={crop.cropName}
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{crop.cropName}</div>
            <p className="text-gray-300 mb-2 font-bold">
              Scientific Name:
              <span className="text-gray-400 font-normal">
                {' '}
                {crop.scientificName}
              </span>
            </p>
            <p className="text-gray-300 mb-2 font-bold">
              Crop Family:
              <span className="text-gray-400 font-normal">
                {' '}
                {crop.cropFamily}
              </span>
            </p>
            <p className="text-gray-300 mb-2 font-bold">
              Crop Type:
              <span className="text-gray-400 font-normal">
                {' '}
                {crop.cropType}
              </span>
            </p>
          </div>
        </Link>
      )}
    </div>
  );
};

export default CropCard;
