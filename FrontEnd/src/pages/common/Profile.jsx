import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  getCropBookmarksByUser,
  getDiseaseBookmarksByUser,
} from '../../api/knowlegdebase';
import { getBookmarkedBlogs } from '../../api/blog';
import { CropCard, DiseaseCard, Loader } from '../../components';

const Profile = () => {
  const user = JSON.parse(localStorage.getItem('userInfo'));
  const userId = user._id;

  const [cropBookmarks, setCropBookmarks] = useState([]);
  const [diseaseBookmarks, setDiseaseBookmarks] = useState([]);
  const [blogBookmarks, setBlogBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const cropBookmarks = await getCropBookmarksByUser(userId);
      setCropBookmarks(cropBookmarks);

      const diseaseBookmarks = await getDiseaseBookmarksByUser(userId);
      setDiseaseBookmarks(diseaseBookmarks);

      const blogBookmarks = await getBookmarkedBlogs(userId);
      setBlogBookmarks(blogBookmarks);

      setLoading(false);
    }

    fetchData();
  }, [userId, user.token]);

  if (loading) {
    return (
      <div className="flex flex-col items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div data-testid="profile">
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-start place-items-start py-5 px-8 ml-0 mr-auto w-full">
          <h1 className="text-3xl text-white font-bold md:text-4xl">Profile</h1>
          <p className="text-gray-300 text-md md:text-lg">
            View your profile details
          </p>
          <hr className="border-primary border-2 w-full mt-4" />
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-col items-start place-items-start py-5 px-8 ml-0 mr-auto w-full">
          <h1 className="text-2xl text-white font-bold md:text-3xl">
            Bookmarked Crops
          </h1>
          <p className="text-gray-300 text-md md:text-lg">
            Learn about different crops and their growing conditions
          </p>
          <hr className="border-gray-500 border-1 w-full mt-4" />
        </div>

        <div className="flex flex-wrap justify-center md:justify-start md:pl-3">
          {cropBookmarks.map((crop) => (
            <div className="m-4" key={crop._id}>
              <CropCard crop={crop} />
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex flex-col items-start place-items-start py-5 px-8 ml-0 mr-auto w-full">
          <h1 className="text-2xl text-white font-bold md:text-3xl">
            Bookmarked Diseases
          </h1>
          <p className="text-gray-300 text-md md:text-lg">
            Learn about different diseases and their symptoms
          </p>
          <hr className="border-gray-500 border-1 w-full mt-4" />
        </div>

        <div className="flex flex-wrap justify-center md:justify-start md:pl-3">
          {diseaseBookmarks.map((disease) => (
            <div className="m-4" key={disease._id}>
              <DiseaseCard disease={disease} />
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex flex-col items-start place-items-start py-5 px-8 ml-0 mr-auto w-full">
          <h1 className="text-2xl text-white font-bold md:text-3xl">
            Bookmarked Blogs
          </h1>
          <p className="text-gray-300 text-md md:text-lg">
            View blogs you have bookmarked
          </p>
          <hr className="border-gray-500 border-1 w-full mt-4" />
        </div>

        <div className="flex flex-wrap justify-center md:justify-start md:pl-3">
          {blogBookmarks.map((blog) => (
            <div className="m-4" key={blog._id}>
              <Link to={`/viewblog/${blog._id}`}>
                <div className="flex flex-col items-center justify-center w-88 bg-darkbg rounded-lg shadow-lg p-5 h-64">
                  <div className="flex flex-col">
                    <h1 className="text-xl text-white font-bold">
                      {blog.title}
                    </h1>
                    <p className="text-gray-300 text-md md:text-lg mt-2">
                      {blog.createdAt.substring(0, 10)}
                    </p>
                    <hr className="border-gray-500 border-1 w-full mt-4" />
                    <p className="text-gray-300 text-md md:text-lg mt-4">
                      {blog.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-primarylight text-md md:text-lg"
                        >
                          {tag}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
