import { useState, useEffect } from 'react';
import { getAllCropsShort, getRandomDiseases } from '../../api/knowlegdebase';
import {
  BlogContainer,
  CropCard,
  DiseaseCard,
  ForumCardContainer,
  Loader,
  PublicBlogCard,
  Skeleton,
} from '../../components';
import { FaChevronCircleLeft, FaChevronCircleRight } from 'react-icons/fa';
import { Forum } from '../../api/forum';
import { getLatestBlogPosts } from '../../api/blog';
import { Link } from 'react-router-dom';

const Home = () => {
  const [crops, setCrops] = useState([]);
  const [diseases, setDiseases] = useState([]);
  const [forums, setForums] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentcrop, setCurrentCrop] = useState(0);
  const [currentdisease, setCurrentDisease] = useState(0);
  const [isFade, setIsFade] = useState(false);
  const [blogs, setBlogs] = useState([]);

  //forum states
  const [forumsLoading, setForumsLoading] = useState(true);
  const [forumLoaded, setForumLoaded] = useState(false);

  const handleNextClickCrop = () => {
    setIsFade(true);
    setTimeout(() => {
      setCurrentCrop(currentcrop === crops.length - 1 ? 0 : currentcrop + 1);
      setIsFade(false);
    }, 300);
  };

  const handlePrevClickCrop = () => {
    setIsFade(true);
    setTimeout(() => {
      setCurrentCrop(currentcrop === 0 ? crops.length - 1 : currentcrop - 1);
      setIsFade(false);
    }, 300);
  };

  const handleNextClickDisease = () => {
    setIsFade(true);
    setTimeout(() => {
      setCurrentDisease(
        currentdisease === diseases.length - 1 ? 0 : currentdisease + 1
      );
      setIsFade(false);
    }, 300);
  };

  const handlePrevClickDisease = () => {
    setIsFade(true);
    setTimeout(() => {
      setCurrentDisease(
        currentdisease === 0 ? diseases.length - 1 : currentdisease - 1
      );
      setIsFade(false);
    }, 300);
  };

  const animateStyle = {
    opacity: isFade ? 0 : 1,
    transition: 'opacity 300ms ease-in-out',
  };

  useEffect(() => {
    const fetchCrops = async () => {
      const crops = await getAllCropsShort();
      setCrops(crops);
      //console.log("crops", crops)
      setIsLoading(false);
    };
    fetchCrops();
  }, []);

  useEffect(() => {
    const fetchDisease = async () => {
      const disease = await getRandomDiseases();
      setDiseases(disease);
      //console.log("disease", disease)
      setIsLoading(false);
    };
    fetchDisease();
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await getLatestBlogPosts();
      setBlogs(blogs);
      setIsLoading(false);
      //console.log(blogs);
    };
    fetchBlogs();
  }, []);

  //refresh method for forums
  const refreshForums = async () => {
    let forums = await Forum.getForums();

    //trim the forums to 3
    forums.length = 3;

    setForums(forums);
    setForumsLoading(false);
    setForumLoaded(true);
  };

  //latest forums initial loading
  useEffect(() => {
    refreshForums();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div data-testid="home">
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-start place-items-start py-5 px-8 ml-0 mr-auto w-full">
          <h1 className="text-2xl text-white font-bold md:text-3xl">
            Featured Crops
          </h1>
          <p className="text-gray-300 text-md md:text-lg">
            Learn about different crops and their growing conditions
          </p>
          <hr className="border-gray-500 border-1 w-full mt-4" />
        </div>
        {/* mobile carousal */}
        <div className="relative">
          <div className="flex flex-wrap justify-center md:hidden">
            <div className="m-5">
              <CropCard crop={crops[currentcrop]} style={animateStyle} />
            </div>
            <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
              <FaChevronCircleLeft
                className="text-3xl text-white cursor-pointer"
                onClick={handlePrevClickCrop}
              />
            </div>
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <FaChevronCircleRight
                className="text-3xl text-white cursor-pointer"
                onClick={handleNextClickCrop}
              />
            </div>
          </div>
        </div>

        {/* desktop */}
        <div className="hidden md:flex flex-wrap justify-center">
          {crops.map((crop) => (
            <div className="m-4" key={crop._id}>
              <CropCard crop={crop} />
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-start place-items-start py-5 px-8 ml-0 mr-auto w-full">
          <h1 className="text-2xl text-white font-bold md:text-3xl">
            Featured Diseases
          </h1>
          <p className="text-gray-300 text-md md:text-lg">
            Learn about different diseases and their symptoms
          </p>
          <hr className="border-gray-500 border-1 w-full mt-4" />
        </div>
        {/* mobile carousal */}
        <div className="relative">
          <div className="flex flex-wrap justify-center md:hidden">
            <div className="m-5">
              <DiseaseCard
                disease={diseases[currentdisease]}
                style={animateStyle}
              />
            </div>
            <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
              <FaChevronCircleLeft
                className="text-3xl text-white cursor-pointer"
                onClick={handlePrevClickDisease}
              />
            </div>
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <FaChevronCircleRight
                className="text-3xl text-white cursor-pointer"
                onClick={handleNextClickDisease}
              />
            </div>
          </div>
        </div>

        {/* desktop */}
        <div className="hidden md:flex flex-wrap justify-center">
          {diseases.map((disease) => (
            <div className="m-4" key={disease._id}>
              <DiseaseCard disease={disease} />
            </div>
          ))}
        </div>
      </div>

      {/* latest forums */}
      <div className="flex flex-col items-center justify-center text-white mb-10">
        <div className="flex flex-col items-start place-items-start py-5 px-8 ml-0 mr-auto w-full">
          <h1 className="text-2xl text-white font-bold md:text-3xl">
            Latest Forums
          </h1>
          <p className="text-gray-300 text-md md:text-lg">
            Ask questions and get answers from the community
          </p>
          <hr className="border-gray-500 border-1 w-full mt-4" />
        </div>
        <div className="flex flex-wrap justify-center mx-4 md:mx-0">
          {forumsLoading ? (
            <Skeleton count={6} />
          ) : (
            <ForumCardContainer
              forums={forums}
              loaded={forumLoaded}
              tab="home"
              refresh={refreshForums}
              refreshAll={() => setForumLoaded(false)}
            />
          )}
        </div>
      </div>
      <div className="text-white p-5 sm:p-10">
        <div>
          <h1 className="text-2xl text-white font-bold md:text-3xl">
            Latest Blogs
          </h1>
          <p className="text-gray-300 text-md md:text-lg">
            Everything you need to know about Agriculture
          </p>
          <hr className="border-gray-500 border-1 w-full mt-4" />
        </div>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {blogs.map((blog) => (
            <div key={blog._id}>
              <Link to={`/viewblog/${blog._id}`}>
                <div className="my-4">
                  <PublicBlogCard
                    title={blog.title}
                    author={blog.author.firstName + ' ' + blog.author.lastName}
                    authorID={blog.author._id}
                    date={blog.createdAt}
                    tags={blog.tags}
                    likes={blog.likes.length}
                    dislikes={blog.dislikes.length}
                    comments={blog.comments.length}
                    bookmarked={blog.bookmarked}
                  />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
