import { Link } from 'react-router-dom';

const DiseaseCard = ({ disease }) => {
  return (
    <div className="max-w-sm rounded-lg bg-darkbg overflow-hidden shadow-lg text-white transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-20 cursor-pointer">
      {disease && disease.isAccepted && (
        <Link to={`/disease/${disease._id}`}>
          <img
            className="h-48 w-96 object-cover"
            src={disease.diseaseImage[0]}
            alt={disease.diseaseName}
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{disease.diseaseName}</div>
            <p className="text-gray-300 mb-2 font-bold">
              Affected Crops:
              <span className="text-gray-400 font-normal">
                {disease.diseaseCrops.map((crop, index) => (
                  <span key={index}> {crop},</span>
                ))}
              </span>
            </p>
            <p className="text-gray-300 mb-2 font-bold">
              Disease Type:
              <span className="text-gray-400 font-normal">
                {' '}
                {disease.diseaseType}
              </span>
            </p>
            <p className="text-gray-300 mb-2 font-bold">
              Disease Status:
              <span className="text-gray-400 font-normal">
                {' '}
                {disease.diseaseStatus}
              </span>
            </p>
          </div>
        </Link>
      )}
    </div>
  );
};

export default DiseaseCard;
