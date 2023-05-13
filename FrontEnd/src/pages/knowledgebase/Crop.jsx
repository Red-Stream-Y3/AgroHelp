import { useState, useEffect } from 'react'
import { getCropById, addRemoveCropBookmarks } from '../../api/knowlegdebase'
import { getAuthorInfo } from '../../api/user'
import { useParams } from 'react-router-dom'
import { Loader } from '../../components'
import { BsBookmarkCheckFill, BsBookmarkDashFill } from 'react-icons/bs'

const Crop = () => {
  const { id } = useParams()
  const [crop, setCrop] = useState({})
  const [isLoading, setIsLoading ] = useState(true)
  const [authorId, setAuthorId] = useState('')
  const [author, setAuthor] = useState({})

  const user = JSON.parse(localStorage.getItem('userInfo'))
  
  let userId = null;
  if(user) {
    userId = user._id
  }

  useEffect(() => {
    const fetchCrop = async () => {
      const crop = await getCropById(id);
      setCrop(crop);
      setAuthorId(crop.author);
      setIsLoading(false);
    };
    fetchCrop();
  }, [id]);
    
  useEffect(() => {
    if (authorId) {
      const fetchAuthor = async () => {
        const author = await getAuthorInfo(authorId);
        setAuthor(author);
      };
      fetchAuthor();
    }
  }, [authorId]);

  const checkBookmark = () => {
    if (crop.bookmarkedBy.includes(userId)) {
      return true
    } else {
      return false
    }
  }

  const handleBookmark = async (cropId) => {
    const response = await addRemoveCropBookmarks(cropId, userId) 
    if (response) {
      if(response.data.bookmarkedBy.includes(userId)) {
        alert('Crop bookmarked')
      } 
      else {
        alert('Crop removed from bookmarks')
      }
    }
    setCrop(response.data)
    console.log('response', response.data.bookmarkedBy)
  }


  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Loader />
      </div>
    )
  }

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
          <p className="text-gray-300 font-bold mb-3">Scientific Name:
            <span className="text-gray-300 font-normal"> {crop.scientificName}</span>
          </p>
          <p className="text-gray-300 font-bold mb-3">Crop Family: 
            <span className="text-gray-300 font-normal"> {crop.cropFamily}</span>
          </p>
          <p className="text-gray-300 font-bold mb-3">Crop Type: 
            <span className="text-gray-300 font-normal"> {crop.cropType}</span>
          </p>
          <p className="text-gray-300 font-bold mb-3">Crop Introduction: 
            <span className="text-gray-300 font-normal"> {crop.cropIntro}</span>
          </p>
        </div>
        {/* author information */}
        <div className="pb-6 px-6 flex items-center justify-start">
          <img className="h-10 w-10 rounded-full object-cover object-center mr-2"
            src={author.profilePic}
            alt={author.firstName}
          />
          <p className="text-gray-300 mb-2 font-bold">Article By 
            <span className="text-gray-400 font-normal"> {author.firstName} {author.lastName}</span>
          </p>

          {/* bookmark and report */}
          <div className="flex ml-auto">
            {!checkBookmark() ? (
              <button
                className="flex items-center justify-center bg-green-500 text-white rounded-full h-10 w-10 mr-2"
                onClick={() => handleBookmark(crop._id)}
              >
                <BsBookmarkCheckFill className="h-6 w-6" />
              </button>
            ) : (
              <button
                className="flex items-center justify-center bg-red-500 text-white rounded-full h-10 w-10 mr-2"
                onClick={() => handleBookmark(crop._id)}
              >
                <BsBookmarkDashFill className="h-6 w-6" />
              </button>
            )}
            {/* <button 
              className="flex items-center justify-center bg-red-500 text-white rounded-full h-10 w-10"
              onClick={() => handleReport(crop._id)}
            >
              <FaFlag className="h-6 w-6" />
            </button> */}
          </div>
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
              <p className="text-gray-300 font-bold mb-3">Scientific Name: 
                <span className="text-gray-300 font-normal"> {crop.scientificName}</span>
              </p>
              <p className="text-gray-300 font-bold mb-3">Crop Family: 
                <span className="text-gray-300 font-normal"> {crop.cropFamily}</span>
              </p>
              <p className="text-gray-300 font-bold mb-3">Crop Type: 
                <span className="text-gray-300 font-normal"> {crop.cropType}</span>
              </p>
              <p className="text-gray-300 font-bold mb-3">Crop Introduction: 
                <span className="text-gray-300 font-normal"> {crop.cropIntro}</span>
              </p>
              <div>
                {/* author information */}
                <div className="py-6 flex items-center justify-start">
                  <img className="h-10 w-10 rounded-full object-cover object-center mr-2"
                    src={author.profilePic}
                    alt={author.firstName}
                  />
                  <p className="text-gray-300 mb-2 font-bold">Article By
                    <span className="text-gray-400 font-normal"> {author.firstName} {author.lastName}</span>
                  </p>
                  {/* bookmark and report */}
                  <div className="flex ml-auto">
                    {!checkBookmark() ? (
                      <button
                        className="flex items-center justify-center bg-green-500 text-white rounded-full h-10 w-10 mr-2"
                        onClick={() => handleBookmark(crop._id)}
                      >
                        <BsBookmarkCheckFill className="h-6 w-6" />
                      </button>
                    ) : (
                      <button
                        className="flex items-center justify-center bg-red-500 text-white rounded-full h-10 w-10 mr-2"
                        onClick={() => handleBookmark(crop._id)}
                      >
                        <BsBookmarkDashFill className="h-6 w-6" />
                      </button>
                    )}
                    {/* <button 
                      className="flex items-center justify-center bg-red-500 text-white rounded-full h-10 w-10"
                      onClick={() => handleReport(crop._id)}
                    >
                      <FaFlag className="h-6 w-6" />
                    </button> */}
                  </div>
                </div>
              </div>
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