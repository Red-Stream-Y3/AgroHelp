/** @format */

import React from "react";
import { useState, useEffect } from "react";
import { getAllBlogs, getAcceptedBlogs } from "../../api/blog";
import {
  BlogContainer,
  BlogBanner,
  PublicBlogCard,
  BlogSearchBar,
} from "../../components";
import { Link } from "react-router-dom";

export default function BlogDashboard() {
  const [blogs, setBlogs] = useState([]);
  const [isLogged, setIsLogged] = useState(false);

  const user = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    try {
      const fetchAcceptedBlogs = async () => {
        const blogs = await getAcceptedBlogs();
        setBlogs(blogs);
        //console.log(blogs);
      };
      fetchAcceptedBlogs();
    } catch (error) {
      console.log("error", error);
    }
  }, []);

  let userID;

  if (user && blogs) {
    userID = user._id;
  }

  useEffect(() => {
    if (user) {
      setIsLogged(true);
    }
  }, []);

  return (
    <div>
      <BlogBanner />
      <BlogContainer>
        <div className="flex flex-col md:flex-row justify-center md:justify-end items-center">
          

          {isLogged && (
            <>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2 md:mt-0 md:mr-4">
            <Link to="/createblog">Start Your Blog</Link>
          </button>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2 md:mt-0 md:mr-4 ">
              <Link to={`/myblogs/${userID}`}>My Blog Posts</Link>
            </button>
            </>
            
          )}
          <div className="ml-4 mt-4 md:mt-0">
            <BlogSearchBar />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 mt-4">
          {blogs.map((blog) => (
            <div key={blog.id}>
              <Link to={`/viewblog/${blog._id}`}>
                <PublicBlogCard
                  blogID={blog._id}
                  title={blog.title}
                  author={blog.author.firstName + " " + blog.author.lastName}
                  authorID={blog.author._id}
                  date={blog.createdAt}
                  tags={blog.tags}
                  likes={blog.likes.length}
                  dislikes={blog.dislikes.length}
                  comments={blog.comments.length}
                  user={userID}
                />
              </Link>
            </div>
          ))}
        </div>
      </BlogContainer>
    </div>
  );
}
