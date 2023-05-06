/** @format */

import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  return (
    <div className="flex justify-end">
      <div className="relative">
        <input
          type="text"
          className="w-60 px-4 py-2 bg-white shadow-lg rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-transparent"
          placeholder="Search"
        />
        <div className="absolute inset-y-0 right-0 flex items-center px-2">
          <button type="submit" className="focus:outline-none">
            <FaSearch className="text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
