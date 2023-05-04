/** @format */

import React, {useState} from "react";
import { AiFillLike, AiFillDislike, AiFillStar } from "react-icons/ai";

const Card = ({ title, author, date, tags, onClick, likes }) => {

  //const [likes, setLikes] = useState(0);
  // const [isBookmarked, setIsBookmarked] = useState(false);

  // const handleLikeClick = () => {
  //   setLikes((prevLikes) => prevLikes + 1);
  // };

  // const handleBookmarkClick = () => {
  //   setIsBookmarked((prevIsBookmarked) => !prevIsBookmarked);
  // };

  return (
    <div
      className="bg-white shadow-lg rounded-lg px-4 py-6 sm:flex sm:flex-col sm:justify-between sm:items-start sm:px-6 sm:py-8 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-20 hover:bg-green-100 cursor-pointer"
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
      <div className="absolute bottom-0 right-0 flex items-center mb-2 mr-2">
      <button
          className="mr-2 p-2 rounded-full text-xl"
          //onClick={handleBookmarkClick}
          //aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
        >
          {/* color={isBookmarked ? "gold" : "gray"} */}
          <AiFillStar  />
        </button>
        <div className="mr-2 p-2 rounded-full text-xl">
          <AiFillLike />
        </div>
        <span className="text-lg">{likes} Likes</span>
      </div>
    </div>
  );
};

export default Card;
