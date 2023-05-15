/** @format */

import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/blogsearch/${search}`);
    } else {
      navigate("/blog");
    }
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <div className="">
      <div className="relative">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            name="search"
            id="search"
            className="w-88 px-4 py-2 bg-darkbg text-white shadow-lg rounded-lg ring-1 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-transparent"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>

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
