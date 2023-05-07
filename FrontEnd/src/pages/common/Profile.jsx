import { useState, useEffect } from "react"
import { Loader } from "../../components"
import { getCropBookmarksByUser, getDiseaseBookmarksByUser } from "../../api/knowlegdebase"
import { getSubscribedForumsByUser } from "../../api/forum"
import { CropCard, DiseaseCard, ForumCard } from "../../components"

const Profile = () => {
  
  const [isLoading, setIsLoading ] = useState(true)
  const [crops, setCrops] = useState([{}])
  const [diseases, setDiseases] = useState([{}])
  const [subscriptions, setSubscriptions] = useState([{}])

  console.log('crops', crops)


  const user = JSON.parse(localStorage.getItem('userInfo'))
  console.log('user', user)

  useEffect(() => {
    setIsLoading(false)
  }, [])

  // useEffect(() => {
  //   const fetchCrops = async () => {
  //     const crops = await getCropBookmarksByUser(user._id);
  //     setCrops(crops);
  //     setIsLoading(false);
  //   };
  //   fetchCrops();
  // }, [user._id]);

  // useEffect(() => {
  //   const fetchDiseases = async () => {
  //     const diseases = await getDiseaseBookmarksByUser(user._id);
  //     setDiseases(diseases);
  //     setIsLoading(false);
  //   };
  //   fetchDiseases();
  // }, [user._id]);

  // useEffect(() => {
  //   const fetchSubscriptions = async () => {
  //     const subscriptions = await getSubscribedForumsByUser(
	// 			user,
	// 		);
  //     setSubscriptions(subscriptions);
  //     setIsLoading(false);
  //   };
  //   fetchSubscriptions();
  // }, [user._id]);


  // console.log('subscriptions', subscriptions)


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
          className="w-64 h-64 object-cover object-center rounded-full mx-auto p-5"
          src={user.profilePic}
          alt={user.firstName}
        />
        <div className="py-4 px-6 text-center">
          <h1 className="text-3xl font-semibold mb-3">{user.firstName} {user.lastName}</h1>
          <p className="text-gray-300 mb-2 font-bold">Username:
            <span className="text-gray-400 font-normal"> {user.username}</span>
          </p>
          <p className="text-gray-300 mb-2 font-bold">Email:
            <span className="text-gray-400 font-normal"> {user.email}</span>
          </p>
          <p className="text-gray-300 mb-2 font-bold">Role:
            <span className="text-gray-400 font-normal"> {user.role}</span>
          </p>
        </div>
      </div>

      {/* desktop view */}
      <div className="hidden md:block bg-darkbg text-white overflow-hidden mx-auto md:rounded-xl md:mx-36 md:my-10">
        <div className="grid grid-cols-2 lg:grid-cols-[1fr,2fr]" >
          <div className="col-span-1">
            <img
              className="w-64 h-64 object-cover object-center rounded-full mx-auto p-5"
              src={user.profilePic}
              alt={user.firstName}
            />
          </div>
          <div className="col-span-1 my-auto">
            <div className="py-4 px-6">
              <h1 className="text-3xl font-semibold mb-3">{user.firstName} {user.lastName}</h1>
              <p className="text-gray-300 mb-2 font-bold">Username:
                <span className="text-gray-400 font-normal"> {user.username}</span>
              </p>
              <p className="text-gray-300 mb-2 font-bold">Email:
                <span className="text-gray-400 font-normal"> {user.email}</span>
              </p>
              <p className="text-gray-300 mb-2 font-bold">Role:
                <span className="text-gray-400 font-normal"> {user.role}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-lightbg text-white overflow-hidden mx-auto md:rounded-xl md:mx-36 md:my-10 md:bg-darkbg">
        <div className="py-4 px-6">
          <h1 className="text-3xl font-semibold mb-3"> Bookmarked Crops </h1>
          <hr className="border-gray-500 border-1 w-full mb-5" />
          {crops.length > 1 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {crops.map((crop) => (
                <CropCard key={crop._id} crop={crop} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-36">
              <h1 className="text-lg font-semibold mb-3">No Bookmarks</h1>
            </div>
          )}
          
        </div>
        
        <div className="py-4 px-6">
          <h1 className="text-3xl font-semibold mb-3"> Bookmarked Diseases </h1>
          <hr className="border-gray-500 border-1 w-full mb-5" />
          {diseases.length > 1 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {diseases.map((crop) => (
                <CropCard key={crop._id} crop={crop} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-36">
              <h1 className="text-lg font-semibold mb-3">No Bookmarks</h1>
            </div>
          )}
        </div>
        <div className="py-4 px-6">
          <h1 className="text-3xl font-semibold mb-3"> Subscriped Forums </h1>
          <hr className="border-gray-500 border-1 w-full mb-5" />
          {subscriptions.length > 1 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {subscriptions.map((crop) => (
                <CropCard key={crop._id} crop={crop} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-36">
              <h1 className="text-lg font-semibold mb-3">No Bookmarks</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile