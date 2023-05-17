/** @format */

import React from "react";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAuthorAllBlogs, deleteBlog } from "../../api/blog";
import { BlogContainer, BlogCard } from "../../components";
import { toast } from "react-toastify";

export default function MyBlogPosts() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("userInfo"));

  let userID;
  if (user && blogs) {
    userID = user._id;
  }

  useEffect(() => {
    const fetchBlogsByAuthor = async () => {
      const blogs = await getAuthorAllBlogs(userID);
      setBlogs(blogs);
    };
    fetchBlogsByAuthor();
  }, [userID]);

  //refresh blog object
  const refreshFunc = async () => {
    setLoading(true);
    let res = await getAuthorAllBlogs(userID);
    setBlogs(res);
    setLoading(false);
  };

  //delete blog
  const handleDeleteBlog = async (id) => {
    try {
      await deleteBlog(id);
      toast.success("Blog deleted successfully", {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: false,
        closeOnClick: true,
        autoClose: 1500,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      refreshFunc();
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="my-8">
      <BlogContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 mt-4">
          <h1 className="flex flex-row items-start justify-start ml-4 text-2xl font-bold text-white md:text-3xl">
            My Blog Posts
          </h1>
          <hr className="border-green-200 border-1 w-full mt-4 mb-8" />

          {blogs.map((blog) => (
            <div key={blog.id}>
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
                  isAccepted={blog.isAccepted}
                  handleDelete={() => handleDeleteBlog(blog._id)}
                />
              </Link>
            </div>
          ))}
        </div>
      </BlogContainer>
    </div>
  );
}
