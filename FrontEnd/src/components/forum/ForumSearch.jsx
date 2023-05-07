import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

const ForumSearch = ({search, setSearch, handleSearchClick, setSearched}) => {
    return (
        <div className="relative z-10">
            <div className="flex sm:justify-center">
                <div className="relative w-full sm:max-w-lg">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <AiOutlineSearch className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        value={search}
                        onFocus={() => setSearched(true)}
                        onChange={(e) => setSearch(e.target.value)}
                        className=" border text-sm rounded-lg block w-full pl-10 p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Search Forums"
                    />
                </div>
                <button
                    onClick={handleSearchClick}
                    className="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white rounded-lg border border-blue-700 focus:ring-4 focus:outline-none bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">
                    <AiOutlineSearch className="w-5 h-5 text-gray-400 mr-1" />{" "}
                    Search
                </button>
            </div>
        </div>
    );
};

export default ForumSearch;