/** @format */

import React, { useState, useEffect } from "react";
import {
  AiFillLike,
  AiFillDislike,
  AiFillEdit,
  AiFillDelete,
} from "react-icons/ai";
import { MdComment } from "react-icons/md";
import { Link } from "react-router-dom";

const Card = ({
  blogID,
  title,
  author,
  authorID,
  date,
  tags,
  handleDelete,
  likes,
  dislikes,
  comments,
  user,
}) => {
  const [isAuthor, setIsAuthor] = useState(false);

  useEffect(() => {
    if ((user, authorID === user)) {
      setIsAuthor(true);
    }
  }, [authorID, user]);

  //console.log(isAuthor);

  //date formatter
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US");
  }

  return (
    <div className="bg-white shadow-lg rounded-lg px-4 py-6 sm:flex sm:flex-col sm:justify-between sm:items-start sm:px-6 sm:py-8 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-20 hover:bg-green-200 cursor-pointer">
      {isAuthor && (
        <>
          <div className="fixed top-0 right-0 flex items-center justify-end mr-2 mb-2">
            <Link to={`/editblog/${blogID}`}>
              <button className=" top-0 right-0 mt-10 mr-4 hover:bg-green-400 text-green-800 font-bold py-2 px-2 rounded-full  sm:block">
                <AiFillEdit />
              </button>
            </Link>
            <Link to={`#`}>
            <button
              className="top-0 right-0 mt-10 ml-2 mr-4 hover:bg-red-600 text-black font-bold py-2 px-2 rounded-full sm:block"
              onClick={handleDelete}
            >
              <AiFillDelete />
            </button>
            </Link>
          </div>
        </>
      )}

      <div className="text-2xl font-bold mb-2">{title}</div>
      <hr className="my-2" />
      <div className="text-gray-500 text-sm mb-2 flex items-center">
        <Link to={`/blogAuthor/${authorID}`} className="mr-2">
          <span className="mr-2 hover:text-blue-800 hover:underline cursor-pointer">
            {author}
          </span>
        </Link>
        <span>|</span>
        <span className="ml-2 mr-2">{formatDate(date)}</span>
        <span>|</span>
        <span className="ml-2">{tags}</span>
      </div>

      <div className="fixed bottom-0 right-0 flex items-center justify-end mr-2 mb-2">
        <div className="flex items-center mx-2">
          <div className="text-blue-600 sm:block">
            <AiFillLike />
          </div>
          <span className="text-small mx-2">{likes}</span>
        </div>
        <div className="flex items-center mx-2">
          <div className="text-red-600 sm:block">
            <AiFillDislike />
          </div>
          <span className="text-small mx-2">{dislikes}</span>
        </div>
        <div className="flex items-center mx-2">
          <div className="text-gray-600 sm:block">
            <MdComment />
          </div>
          <span className="text-small mx-2">{comments}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
