/** @format */

import React from "react";
import { Link } from "react-router-dom";

const BlogHeader = ({ title, author, authorDP, date, tags, authorId }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold leading-tight text-gray-200 text-center sm:text-left">
        {title}
      </h1>
      <Link to={`/blogAuthor/${authorId}`} >
        <div className="flex flex-col sm:flex-row items-center mt-4">
          <img
            className="h-12 w-12 rounded-full object-cover mr-6 mb-2 sm:mb-0 hidden sm:block"
            src={authorDP}
            alt={author}
          />
          <div className="text-gray-200 text-xl text-center sm:text-left hover:text-orange-600 hover:underline cursor-pointer">{author}</div>
        </div>
      </Link>
      
      <div className="flex justify-center sm:justify-end text-gray-200 mt-4 sm:mt-0">
        {date}
      </div>
      <div className="flex justify-center sm:justify-end mt-2">
        <div className="flex justify-center sm:justify-end text-gray-200 mt-4 sm:mt-0">
          {tags}
        </div>
      </div>
      <hr className="my-4 border-green-300" />
    </div>
  );
};

export default BlogHeader;
