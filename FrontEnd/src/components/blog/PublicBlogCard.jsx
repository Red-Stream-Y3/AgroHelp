/** @format */

import React, { useState, useEffect } from "react";
import { AiFillLike, AiFillDislike, AiFillEdit } from "react-icons/ai";
import { MdComment } from "react-icons/md";
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
}) => {
  //date formatter
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US");
  }

  return (
    <div className="bg-gray-700 shadow rounded-lg px-4 py-6 sm:flex sm:flex-col sm:justify-between sm:items-start sm:px-6 sm:py-8 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-20 hover:bg-gray-800 cursor-pointer">
      <div className="text-2xl font-bold mb-2 text-white">{title}</div>
      <hr className="my-2" />
      <div className="text-gray-400 text-sm mb-2 flex items-center">
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

      <div className="fixed bottom-0 right-0 flex items-center justify-end mr-2 mb-2 text-gray-500">
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
          <div className="text-xl text-gray-600">
            <MdComment />
          </div>
          <span className="text-lg mx-2">{comments}</span>
        </div>
      </div>
    </div>
  );
};

export default PublicBlogCrad;