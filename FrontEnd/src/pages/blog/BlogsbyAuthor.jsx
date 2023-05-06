/** @format */

import React from "react";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getBlogsByAuthor } from "../../api/blog";
import { BlogContainer, BlogCard } from "../../components";

export default function BlogsbyAuthor() {
  const { id } = useParams();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogsByAuthor = async () => {
      const blogs = await getBlogsByAuthor(id);
      setBlogs(blogs);
    };
    fetchBlogsByAuthor();
  }, [id]);

  const user = JSON.parse(localStorage.getItem("userInfo"));
  let userID;

  if (user && blogs) {
    userID = user._id;
  }

  return (
    <div className="my-8">
      <BlogContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 mt-4">
          {blogs.map((blog) => (
            <div key={blog.id}>
              <div className="flex flex-row items-center justify-center">
                <img
                  src={blog.author.profilePic}
                  alt="blog"
                  className="w-12 h-12 object-cover rounded-full"
                />
                <h1 className="ml-4 text-2xl font-bold text-gray-800 md:text-3xl">
                  {blog.author.firstName + " " + blog.author.lastName}
                </h1>
              </div>
              <hr className="border-gray-500 border-1 w-full mt-4 mb-8" />
              <Link to={`/viewblog/${blog._id}`}>
                <BlogCard
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
