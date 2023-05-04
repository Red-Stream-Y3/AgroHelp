/** @format */

import React from "react";
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import {
  BlogContainer,
  BlogBanner,
  BlogCard,
  BlogSearchBar,
} from "../../components";
import { Link } from "react-router-dom";

export default function BlogDashboard() {
  const [blogs, setBlogs] = useState([]);

  //get all blogs
  const getAllBlogs = async () => {
    try {
      const response = await fetch("http://localhost:9120/api/blog");
      const jsonData = await response.json();

      setBlogs(jsonData);
      //console.log(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  //date formatter
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US");
  }

  function handleBlogClick(id) {
    window.location.href = `/viewblog/${id}`;
  }

  return (
    <div>
      <BlogBanner />
      <BlogContainer>
        <div className="flex justify-end">
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-0 md:mr-8">
            <Link to="/createblog">Start Your Blog</Link>
          </button>
          <BlogSearchBar />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 mt-4">
          {blogs.map((blog) => (
            <div key={blog.id}>
              <Link to={`/viewblog/${blog._id}`}>
                <BlogCard
                  title={blog.title}
                  author={blog.author.firstName + " " + blog.author.lastName}
                  date={formatDate(blog.createdAt)}
                  tags={blog.tags}
                  //onClick={}
                />
              </Link>
            </div>
          ))}
        </div>
      </BlogContainer>
    </div>
  );
}
