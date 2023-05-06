/** @format */

import React, { useState } from "react";
import { AiFillLike, AiFillDislike, AiFillStar } from "react-icons/ai";
import { MdComment } from "react-icons/md";

const Card = ({
  title,
  author,
  date,
  tags,
  onClick,
  likes,
  dislikes,
  comments,
}) => {
  return (
    <div
      className="bg-white shadow-lg rounded-lg px-4 py-6 sm:flex sm:flex-col sm:justify-between sm:items-start sm:px-6 sm:py-8 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-20 hover:bg-green-200 cursor-pointer"
      onClick={onClick}
    >
      <div className="text-2xl font-bold mb-2">{title}</div>
      <hr className="my-2" />
      <div className="text-gray-500 text-sm mb-2 flex items-center">
        <span className="mr-2">{author}</span>
        <span>|</span>
        <span className="ml-2 mr-2">{date}</span>
        <span>|</span>
        <span className="ml-2">{tags}</span>
      </div>

      <div className="fixed bottom-0 right-0 flex items-center justify-end mr-2 mb-2">
  <div className="flex items-center mx-2">
    <div className="p-2 rounded-full text-xl bg-blue-500 text-white">
      <AiFillLike />
    </div>
    <span className="text-lg mx-2">{likes}</span>
  </div>
  <div className="flex items-center mx-2">
    <div className="p-2 rounded-full text-xl bg-red-500 text-white">
      <AiFillDislike />
    </div>
    <span className="text-lg mx-2">{dislikes}</span>
  </div>
  <div className="flex items-center mx-2">
    <div className="p-2 rounded-full text-xl bg-green-500 text-white">
      <MdComment />
    </div>
    <span className="text-lg mx-2">{comments}</span>
  </div>
</div>
    </div>
  );
};

export default Card;
