/** @format */

import React from "react";

const BlogHeader = ({ title, author, authorDP, date, tags }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold leading-tight text-gray-900">
        {title}
      </h1>
      <div className="flex flex-col sm:flex-row items-center mt-4">
        <img
          className="h-8 w-8 rounded-full object-cover mr-6 mb-2 sm:mb-0"
          src={authorDP}
          alt={author}
        />
        <div className="text-gray-700">{author}</div>
        {/* <div className="mx-2">|</div> */}
      </div>

      <div className="flex justify-end text-gray-500">{date}</div>

      <div className="flex justify-end">
        <div className="mt-2 inline-block bg-green-200 rounded px-3 py-1 text-sm font-semibold text-gray-700">
          {tags}
        </div>
      </div>
      <hr className="my-4 border-green-300" />
    </div>
  );
};

export default BlogHeader;
