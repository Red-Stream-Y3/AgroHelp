/** @format */

import React, { useState } from "react";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { BsBookmarkCheckFill, BsBookmarkPlus } from "react-icons/bs";

export default function BlogsBookmarksLikes() {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [bookmarked, setBookmarked] = useState(false);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleDislike = () => {
    setDislikes(dislikes + 1);
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center">
        <button
          onClick={handleLike}
          className="hover:bg-blue-500 font-bold py-1 px-3 rounded mr-1 mb-1"
        >
          <AiOutlineLike size={16} />
        </button>
        <div className="text-sm font-bold mr-1">{likes} Likes</div>
        <button
          onClick={handleDislike}
          className="hover:bg-red-500 font-bold py-1 px-3 rounded mr-1 mb-1"
        >
          <AiOutlineDislike size={16} />
        </button>
        <div className="text-sm font-bold mr-1">{dislikes} Dislikes</div>
        <button onClick={handleBookmark} className="mb-1 ml-4">
          {bookmarked ? (
            <BsBookmarkCheckFill size={16} className="" />
          ) : (
            <BsBookmarkPlus size={16} className="text-gray-700" />
          )}
        </button>
      </div>
    </div>
  );
}
