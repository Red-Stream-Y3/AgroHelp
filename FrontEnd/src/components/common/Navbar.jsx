import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaBookOpen,  FaQuestion, FaPenNib, FaSearch, FaUser  } from 'react-icons/fa';
import { ImLeaf } from 'react-icons/im';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';

const Navbar = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);


    return (
        <nav className="bg-green-600">
            <div className=" max-w-full mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center">
                            <ImLeaf className="h-8 w-8 text-white" />
                            <span className="text-white font-extrabold ml-2 text-2xl">AgroHelp</span>
                        </Link>
                    </div>
                    <div className="hidden md:flex md:items-center ml-auto">
                        <Link to="/" className="px-3 py-2 text-white hover:bg-green-700 rounded-md flex items-center">
                            <FaHome className="h-6 w-6" />
                            <span className="ml-2">Home</span>
                        </Link>
                        <Link to="/knowledge-base" className="px-3 py-2 text-white hover:bg-green-700 rounded-md flex items-center">
                            <FaBookOpen className="h-6 w-6" />
                            <span className="ml-2">Knowledge Base</span>
                        </Link>
                        <Link to="/forum" className="px-3 py-2 text-white hover:bg-green-700 rounded-md flex items-center">
                            <FaQuestion className="h-6 w-6" />
                            <span className="ml-2">Forum</span>
                        </Link>
                        <Link to="/blog" className="px-3 py-2 text-white hover:bg-green-700 rounded-md flex items-center">
                            <FaPenNib className="h-6 w-6" />
                            <span className="ml-2">Blog</span>
                        </Link>
                    </div>

                    <div className="hidden md:flex md:items-center">
                        <div className="hidden md:flex md:ml-6">
                            <div className="flex items-center">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaSearch className="h-5 w-5 text-gray-100" aria-hidden="true" />
                                    </div>
                                    <input
                                        type="text"
                                        name="search"
                                        id="search"
                                        className="bg-green-700 text-white block w-96 pl-10 pr-3 py-2 border border-transparent rounded-md leading-5 placeholder-gray-100 focus:outline-none focus:placeholder-gray-100 focus:ring-1 focus:ring-green-600 focus:border-green-600 sm:text-sm"
                                        placeholder="Search"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="hidden md:flex md:ml-6">
                            <div className="flex items-center">
                                <div className="relative">
                                    <img
                                        className="h-10 w-10 rounded-full bg-slate-500"
                                        src=""
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                                
                    <div className="flex md:hidden ml-auto">
                        <button
                            onClick={toggleMenu}
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md text-green-200 hover:text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-600 focus:ring-white"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? (
                                <HiOutlineX className="block h-6 w-6" aria-hidden="true" />
                            ) : (
                                <HiOutlineMenu className="block h-6 w-6" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <Link
                            to="/"
                            className="flex px-3 py-2 text-base font-medium text-white hover:bg-green-700 rounded-md items-center"
                        >
                            <FaHome className="h-6 w-6" />
                            <span className="ml-2">Home</span>
                        </Link>
                        <Link
                            to="/knowledge-base"
                            className="flex px-3 py-2 text-base font-medium text-white hover:bg-green-700 rounded-md items-center"
                        >
                            <FaBookOpen className="h-6 w-6" />
                            <span className="ml-2">Knowledge Base</span>
                        </Link>
                        <Link
                            to="/forum"
                            className="flex px-3 py-2 text-base font-medium text-white hover:bg-green-700 rounded-md items-center"
                        >
                            <FaQuestion className="h-6 w-6" />
                            <span className="ml-2">Forum</span>
                        </Link>
                        <Link
                            to="/blog"
                            className="flex px-3 py-2 text-base font-medium text-white hover:bg-green-700 rounded-md items-center"
                        >
                            <FaPenNib className="h-6 w-6" />
                            <span className="ml-2">Blog</span>
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;