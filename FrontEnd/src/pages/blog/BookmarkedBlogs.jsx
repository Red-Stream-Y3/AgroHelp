/** @format */

import React from "react";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getBookmarkedBlogs, handleBlogBookamrk } from "../../api/blog";
import { BlogContainer, PublicBlogCard } from "../../components";
import { BsBookmarkCheckFill } from "react-icons/bs";
import { toast } from "react-toastify";

export default function BookmarkedBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");

  const user = JSON.parse(localStorage.getItem("userInfo"));

  let userID = "";
  if (user && blogs) {
    userID = user._id;
  }

  //fetch bookmarked blogs
  useEffect(() => {
    const fetchBoookmarkedBlogs = async () => {
      const blogs = await getBookmarkedBlogs(userID);
      setBlogs(blogs);
      setId(blogs._id);
      //console.log(blogs);
    };
    fetchBoookmarkedBlogs();
  }, [userID]);

  //refresh blog object
  const refreshFunc = async () => {
    setLoading(true);
    let res = await getBlogsByAuthor(userID);
    setBlogs(res);
    setLoading(false);
  };

  return (
    <div className="my-8">
      <BlogContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 mt-4">
          <h1 className="flex flex-row items-start justify-start ml-4 text-2xl font-bold text-white md:text-3xl">
            Saved Blogs <BsBookmarkCheckFill className="ml-4 mt-1" />
          </h1>
          <hr className="border-green-200 border-1 w-full mt-4 mb-8" />
          {blogs.map((blog) => (
            <div key={blog.id}>
              <Link to={`/viewblog/${blog._id}`}>
                <PublicBlogCard
                  title={blog.title}
                  author={blog.author.firstName + " " + blog.author.lastName}
                  authorID={blog.author._id}
                  date={blog.createdAt}
                  tags={blog.tags}
                  likes={blog.likes.length}
                  dislikes={blog.dislikes.length}
                  comments={blog.comments.length}
                  bookmarked={blog.bookmarked}
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
