/** @format */

import React, { useState, useEffect } from "react";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { MdComment } from "react-icons/md";
import { BsBookmarkCheckFill } from "react-icons/bs";
import { FiBookmark } from "react-icons/fi";
import { Link } from "react-router-dom";

const PublicBlogCrad = ({
  title,
  author,
  authorID,
  date,
  tags,
  likes,
  dislikes,
  comments,
  bookmarked,
  user,
  handleBookmark,
  logged,
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    if (user && user == bookmarked) {
      setIsBookmarked(true);
    }
  }, [bookmarked, user]);

  useEffect(() => {
    if (logged) {
      setIsLogged(true);
    }
  });

  //date formatter
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US");
  }

  return (
    <div className="bg-darkbg rounded-lg shadow-lg p-4 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-20 hover:bg-opacity-80 cursor-pointer">
      <div className="text-2xl font-bold mb-2 text-white">{title}</div>
      <hr className="w-full border-primarylight mb-4" />
      <div className="text-gray-400 text-sm mb-2 flex items-center">
        <Link to={`/blogAuthor/${authorID}`} className="mr-2">
          <span className="mr-2 hover:text-blue-800 hover:underline cursor-pointer">
            {author}
          </span>
        </Link>
        <span>|</span>
        <span className="ml-2">{tags}</span>
        <span>|</span>
        <span className="ml-2 mr-2">{formatDate(date)}</span>
      </div>

      <div className="flex justify-end text-white w-full">
        <div className="flex items-center mx-2">
          <div className="">
            {isLogged && (
              <button onClick={handleBookmark}>
                {isBookmarked ? (
                  <BsBookmarkCheckFill className=" text-yellow-300" />
                ) : (
                  <FiBookmark className="text-gray-100 text-xl" />
                )}
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center mx-2">
          <div className="text-xl text-blue-600">
            <AiFillLike />
          </div>
          <span className="text-lg mx-2">{likes}</span>
        </div>
        <div className="flex items-center mx-2">
          <div className="text-xl text-red-600">
            <AiFillDislike />
          </div>
          <span className="text-lg mx-2">{dislikes}</span>
        </div>
        <div className="flex items-center mx-2">
          <div className="text-xl text-gray-400">
            <MdComment />
          </div>
          <span className="text-lg mx-2">{comments}</span>
        </div>
      </div>
    </div>
  );
};

export default PublicBlogCrad;
