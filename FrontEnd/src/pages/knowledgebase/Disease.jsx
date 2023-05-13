import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getDiseaseById, addRemoveDiseaseBookmarks } from '../../api/knowlegdebase'
import { getAuthorInfo } from '../../api/user'
import { Loader } from '../../components'
import { BsBookmarkCheckFill, BsBookmarkDashFill } from 'react-icons/bs'

const Disease = () => {
  const { id } = useParams()
  const [disease, setDisease] = useState({})
  const [isLoading, setIsLoading ] = useState(true)
  const [authorId, setAuthorId] = useState('')
  const [author, setAuthor] = useState({})

  const user = JSON.parse(localStorage.getItem('userInfo'))
  
  let userId = null;
  if(user) {
    userId = user._id
  }

  useEffect(() => { 
    const fetchDisease = async () => {
        const disease = await getDiseaseById(id)
        setDisease(disease)
        setAuthorId(disease.author)
        setIsLoading(false)
    }
    fetchDisease()
  }, [id])

  useEffect(() => {
    if (authorId) {
        const fetchAuthor = async () => {
            const author = await getAuthorInfo(authorId)
            setAuthor(author)
        }
        fetchAuthor()
    }
  }, [authorId])

    const checkBookmark = async () => {
        console.log('calling check bookmark')
        if (disease.bookmarkedBy.includes(userId)) {
            console.log('true')
            return true
        } else {
            console.log('false')
            return false
        }
    }

    const handleBookmark = async (diseaseId) => {
        const response = await addRemoveDiseaseBookmarks(diseaseId, userId)
        console.log('calling handle bookmark')
        if (response) {
            if (response.data.bookmarkedBy.includes(userId)) {
                alert('Disease bookmarked')
            }
            else {
                alert('Disease removed from bookmarks')
            }
        }
        setDisease(response.data)
        console.log('set data')
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
            {disease.diseaseImage && (
                <img
                    className="w-full h-64 object-cover object-center"
                    src={disease.diseaseImage[0]}
                    alt={disease.diseaseName}
                />
            )}
            <div className="py-4 px-6">
                <h1 className="text-3xl font-semibold mb-3">{disease.diseaseName}</h1>
                <p className="text-gray-300 font-bold mb-3">Affected Crops:
                    <span className="text-gray-300 font-normal">
                        {disease.diseaseCrops && (
                            disease.diseaseCrops.map((crop, index) => (
                                <span key={index}> {crop},</span>
                            ))
                        )}
                    </span>
                </p>
                <p className="text-gray-300 font-bold mb-3">Disease Type: 
                    <span className="text-gray-400 font-normal"> {disease.diseaseType}</span>
                </p>
                <p className="text-gray-300 font-bold mb-3">Disease Status: 
                    <span className="text-gray-400 font-normal"> {disease.diseaseStatus}</span>
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
                {disease && !(disease.bookmarkedBy.includes(userId)) ? (
                    <button
                        className="flex items-center justify-center bg-green-500 text-white rounded-full h-10 w-10 mr-2"
                        onClick={() => handleBookmark(disease._id)}
                    >
                        <BsBookmarkCheckFill className="h-6 w-6" />
                    </button>
                    ) : (
                    <button
                        className="flex items-center justify-center bg-red-500 text-white rounded-full h-10 w-10 mr-2"
                        onClick={() => handleBookmark(disease._id)}
                    >
                        <BsBookmarkDashFill className="h-6 w-6" />
                    </button>
                )}
                    {/* <button 
                        className="flex items-center justify-center bg-red-500 text-white rounded-full h-10 w-10"
                        onClick={() => handleReport(disease._id)}
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
                        <p className="text-gray-300 font-bold mb-3">Affected Crops:
                            <span className="text-gray-300 font-normal">
                                {disease.diseaseCrops && (
                                    disease.diseaseCrops.map((crop, index) => (
                                        <span key={index}> {crop},</span>
                                    ))
                                )}
                            </span>
                        </p>
                        <p className="text-gray-300 font-bold mb-3">Disease Type: 
                            <span className="text-gray-400 font-normal"> {disease.diseaseType}</span>
                        </p>
                        <p className="text-gray-300 font-bold mb-3">Disease Status: 
                            <span className="text-gray-400 font-normal"> {disease.diseaseStatus}</span>
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
                            {disease && !(disease.bookmarkedBy.includes(userId)) ? (
                                <button
                                    className="flex items-center justify-center bg-green-500 text-white rounded-full h-10 w-10 mr-2"
                                    onClick={() => handleBookmark(disease._id)}
                                >
                                    <BsBookmarkCheckFill className="h-6 w-6" />
                                </button>
                                ) : (
                                <button
                                    className="flex items-center justify-center bg-red-500 text-white rounded-full h-10 w-10 mr-2"
                                    onClick={() => handleBookmark(disease._id)}
                                >
                                    <BsBookmarkDashFill className="h-6 w-6" />
                                </button>
                            )}

                            
                                {/* <button 
                                    className="flex items-center justify-center bg-red-500 text-white rounded-full h-10 w-10"
                                    onClick={() => handleReport(disease._id)}
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