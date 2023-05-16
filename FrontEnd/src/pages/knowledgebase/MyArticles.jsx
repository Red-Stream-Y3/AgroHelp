import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getCropsByAuthor, getDiseasesByAuthor } from '../../api/knowlegdebase'
import { CropTable, DiseaseTable, Loader } from '../../components'
import { FaDisease, FaLeaf } from 'react-icons/fa';


const MyArticles = () => {

  const user = JSON.parse(localStorage.getItem('userInfo'))
  const userId = user._id

  const [crops, setCrops] = useState([])
  const [diseases, setDiseases] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [table, setTable] = useState('crop')

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
    setLoading(false);
  }, [userId]);



  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Loader />
      </div>
    )
  }

  return (
    <div className="bg-lightbg rounded-lg shadow-md">
      {/* create article */}
      <div className="flex flex-col items-start place-items-start py-5 px-8 ml-0 mr-auto w-full">
        <h1 className="text-2xl text-white font-bold md:text-3xl">Creator Dashboard</h1>
        <p className="text-gray-300 text-md md:text-lg">Manage Your Knowledge Base Articles here </p>
        <hr className="border-gray-500 border-1 w-full mt-4" />
      </div>

      {/* create article button */}
      <div className="flex pb-5 px-8 ml-0 mr-auto w-full">
        <Link to="/create/crop">
            <button className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded mx-1">
                Create Crop
            </button>
        </Link>
        <Link to="/create/disease">
            <button className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded mx-1">
                Create Disease
            </button>
        </Link>
      </div>
      <div className="flex flex-col items-start place-items-start py-5 px-8 ml-0 mr-auto w-full">
        <h1 className="text-2xl text-white font-bold md:text-3xl">My Articles</h1>
        <p className="text-gray-300 text-md md:text-lg">Your Contributions to the Knowledge Base </p>
        <hr className="border-gray-500 border-1 w-full mt-4" />
      </div>

      {/* table buttons */}
      <div className="flex pb-5 px-8 ml-0 mr-auto w-full">
        <button className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded mx-1" onClick={() => setTable('crop')}>
          <FaLeaf className="inline-block mr-4 text-2xl" />
          Crops
        </button>
        <button className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded mx-1" onClick={() => setTable('disease')}>
          <FaDisease className="inline-block mr-4 text-2xl" />
          Diseases
        </button>
      </div>
      

      {/* table */}
      <div>
        {crops && table === 'crop' ? <CropTable crops={crops} /> : <DiseaseTable diseases={diseases} />}
      </div>
      <br />
    </div>

  );
};

export default MyArticles;
