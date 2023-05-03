import { useState, useEffect } from 'react';
import { CropCard, DiseaseCard } from '../../components';
import { Link } from 'react-router-dom';
import { getAllCrops, getAllDiseases } from '../../api/knowlegdebase';

const KnowledgeBase = () => {

    const [crops, setCrops] = useState([]);
    const [diseases, setDiseases] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCrops = async () => {
            const crops = await getAllCrops();
            setCrops(crops);
        }
        const fetchDiseases = async () => {
            const diseases = await getAllDiseases();
            setDiseases(diseases);
        }
        fetchCrops();
        fetchDiseases();
        setIsLoading(false);
    }, []);

    if (isLoading) {
        return <div>Loading...</div>
    }



    return (
        <div>
            {/* create article */}
            <div className="flex flex-col items-start place-items-start py-5 px-8 ml-0 mr-auto w-full">
                <h1 className="text-2xl text-white font-bold md:text-3xl">Knowledgebase Dashboard</h1>
                <p className="text-gray-300 text-md md:text-lg">Temporarily Here. To be moved to a separate page</p>
                <hr className="border-gray-500 border-1 w-full mt-4" />
            </div>

            {/* create article button */}
            <div className="flex pb-5 px-8 ml-0 mr-auto w-full">
                <Link to="/create/crop">
                    <button className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded mx-1">
                        Create Crop
                    </button>
                </Link>
                <Link to="create/disease">
                    <button className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded mx-1">
                        Create Disease
                    </button>
                </Link>
                <Link to="my/articles">
                    <button className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded mx-1">
                        My Articles
                    </button>
                </Link>
            </div>
            

            
            <div className="flex flex-col items-center justify-center">
                <div className="flex flex-col items-start place-items-start py-5 px-8 ml-0 mr-auto w-full">
                    <h1 className="text-2xl text-white font-bold md:text-3xl">All Crops</h1>
                    <p className="text-gray-300 text-md md:text-lg">Learn about different crops and their growing conditions</p>
                    <hr className="border-gray-500 border-1 w-full mt-4" />
                </div>
                <div className="flex flex-wrap justify-center md:justify-start md:pl-3">
                    {crops.map((crop) => (
                        <div className="m-4" key={crop._id}>
                        <CropCard crop={crop} />
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex flex-col items-start place-items-start py-5 px-8 ml-0 mr-auto w-full">
                <h1 className="text-2xl text-white font-bold md:text-3xl">All Diseases</h1>
                <p className="text-gray-300 text-md md:text-lg">Learn about different diseases and their symptoms</p>
                <hr className="border-gray-500 border-1 w-full mt-4" />
            </div>
            <div className="flex flex-wrap justify-center md:justify-start md:pl-3">
                {diseases.map((disease) => (
                <div className="m-4" key={disease._id}>
                    <DiseaseCard disease={disease} />
                </div>
                ))}
            </div>
        </div>
    )
}
export default KnowledgeBase;
