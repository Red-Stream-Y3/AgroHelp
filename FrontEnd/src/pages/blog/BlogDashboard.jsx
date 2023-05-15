/** @format */

import React from "react";
import { useState, useEffect } from "react";
import { getAllBlogs, getAcceptedBlogs } from "../../api/blog";
import {
  BlogContainer,
  BlogBanner,
  PublicBlogCard,
  BlogSearchBar,
  Loader,
} from "../../components";
import { Link } from "react-router-dom";

export default function BlogDashboard() {
  const [blogs, setBlogs] = useState([]);
  const [isLogged, setIsLogged] = useState(false);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("userInfo"));

  let userID = "";

  if (user && blogs) {
    userID = user._id;
  }

  useEffect(() => {
    const fetchAcceptedBlogs = async () => {
      setLoading(true);
      try {
        const blogs = await getAcceptedBlogs();
        setBlogs(blogs);
      } catch (error) {
        console.log("error", error);
      }
      setLoading(false);
    };
    fetchAcceptedBlogs();
  }, []);

  useEffect(() => {
    if (user) {
      setIsLogged(true);
    }
  }, []);

  return (
    <div>
      {loading ? (
        <div className="flex flex-col items-center justify-center h-screen">
          <Loader />
        </div>
      ) : (
        <div>
          {/* <BlogBanner /> */}
          <BlogContainer>
            <div className="flex flex-col items-start place-items-start pt-5 pb-10 w-full">
              <h1 className="text-2xl text-white font-bold md:text-3xl">
                Blog Dashboard
              </h1>
              <p className="text-gray-300 text-md md:text-lg">
                Everything about Agriculture
              </p>
              <hr className="border-gray-500 border-1 w-full mt-4" />
            </div>
            <div className="flex flex-col lg:flex-row items-center lg:justify-between">
              <div className="flex flex-col lg:flex-row items-center">
                {isLogged ? (
                  <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
                    <li className="mr-2">
                      <Link to="#">
                        <div className="inline-block p-4 text-blue-600 bg-gray-100 bg-opacity-5 rounded-t-lg active">
                          Featured Blog Posts
                        </div>
                      </Link>
                    </li>
                    <li className="mr-2">
                      <Link to="/createblog">
                        <div className="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">
                          Start Your Blog
                        </div>
                      </Link>
                    </li>
                    <li className="mr-2">
                      <Link to={`/myblogs/${userID}`}>
                        <div className="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">
                          My Blogs
                        </div>
                      </Link>
                    </li>
                    <li className="mr-2">
                      <Link to={`/savedBlogs/${userID}`}>
                        <div className="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">
                          Bookmarks
                        </div>
                      </Link>
                    </li>
                  </ul>
                ) : (
                  <div>
                    <Link to="/login">
                      <button
                        type="button"
                        className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
                      >
                        Login to Start Your Blog
                      </button>
                    </Link>
                  </div>
                )}
              </div>
              <div className="justify-center md:justify-end">
                <BlogSearchBar />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 mt-4">
              {blogs.map((blog) => (
                <div key={blog.id}>
                  <Link to={`/viewblog/${blog._id}`}>
                    <PublicBlogCard
                      title={blog.title}
                      author={
                        blog.author.firstName + " " + blog.author.lastName
                      }
                      authorID={blog.author._id}
                      date={blog.createdAt}
                      tags={blog.tags}
                      likes={blog.likes.length}
                      dislikes={blog.dislikes.length}
                      comments={blog.comments.length}
                      bookmarked={blog.bookmarked}
                      user={userID}
                      logged={isLogged}
                    />
                  </Link>
                </div>
              ))}
            </div>
          </BlogContainer>
        </div>
      )}
    </div>
  );
}
