import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getCropsByAuthor, getDiseasesByAuthor, deleteCrop, deleteDisease } from '../../api/knowlegdebase'
import { MdDelete } from 'react-icons/md'
import { FaEdit } from 'react-icons/fa'

const MyArticles = () => {

  const user = JSON.parse(localStorage.getItem('userInfo'))
  const userId = user._id
  console.log("id", userId)

  const [crops, setCrops] = useState([])
  const [diseases, setDiseases] = useState([])

  const getCrops = async () => {
    const data = await getCropsByAuthor(userId);
    setCrops(data);
    console.log("crops", data)
  };

  const getDiseases = async () => {
    const data = await getDiseasesByAuthor(userId);
    setDiseases(data);
    console.log('diseases', data)
  };

  useEffect(() => {
    getCrops();
    getDiseases();
  }, []);

  const handleDeleteCrop = async (id) => {
    // alert 
    const confirm = window.confirm('Are you sure you want to delete this crop?')
    if (confirm) {
      await deleteCrop(id)
      getCrops()
    }
  }




  return (
    <div className="bg-gray-900 rounded-lg shadow-md">
      <div className="flex flex-col items-start place-items-start py-5 px-8 ml-0 mr-auto w-full">
        <h1 className="text-2xl text-white font-bold md:text-3xl">My Crops</h1>
        <p className="text-gray-300 text-md md:text-lg">Your contributions to the knowledgebase</p>
        <hr className="border-gray-500 border-1 w-full mt-4" />
      </div>

      <div className="overflow-x-auto px-8">
        <table className="table-auto w-full bg-gray-800 text-white divide-y divide-gray-700 rounded-xl">
          <thead>
            <tr className="bg-secondary text-gray-200 uppercase text-md font-semibold tracking-wider">
              <th className="px-4 py-3 text-center text-md font-medium">Crop Image</th>
              <th className="px-4 py-3 text-center text-md font-medium">Crop ID</th>
              <th className="px-4 py-3 text-center text-md font-medium">Crop Name</th>
              <th className="px-4 py-3 text-center text-md font-medium">Scientific Name</th>
              <th className="px-4 py-3 text-center text-md font-medium">Status</th>
              <th className="px-4 py-3 text-center text-md font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {crops.map((crop) => (
              <tr key={crop._id} className="hover:bg-gray-700 border-b border-gray-600">
                <td className="px-4 py-3 justify-center">
                  <img
                    src={crop.cropImage}
                    alt="crop"
                    className="mx-auto w-20 h-20 object-cover rounded-full md:w-24 md:h-24 lg:w-28 lg:h-28"
                  />
                </td>
                <td className="px-4 py-3 text-center w-10">{crop._id}</td>
                <td className="px-4 py-3 text-center">{crop.cropName}</td>
                <td className="px-4 py-3 text-center">{crop.scientificName}</td>
                <td className="px-4 py-3 text-center">
                  {crop.isAccepted ? (
                    <span className="px-2 inline-flex text-sm leading-5 font-semibold rounded-full bg-green-600 text-white">
                      Accepted
                    </span>
                  ) : (
                    <span className="px-2 inline-flex text-sm leading-5 font-semibold rounded-full bg-red-500 text-white">
                      Pending
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 flex my-10 justify-center">
                  <Link to={`/knowledgebase/crops/${crop._id}`}>
                    <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md mr-2">
                      <FaEdit />
                    </button>
                  </Link>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md"
                    onClick={handleDeleteCrop.bind(this, crop._id)}
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

  );
};

export default MyArticles;
