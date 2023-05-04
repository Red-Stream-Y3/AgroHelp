/** @format */

import React, { useEffect, useState } from "react";
import { BlogContainer, BlogHeader } from "../../components";
import { useParams } from "react-router-dom";
import { commentonBlog } from "../../api/blog";
import BlogsBookmarksLikes from "../../components/blog/BlogsBookmarksLikes";
import { useGlobalContext } from "../../context/ContextProvider";

export default function BlogView() {
  const [blog, setBlog] = React.useState({});
  const [Loading, setLoading] = useState(false);
  const { id } = useParams();

  const getBlogbyId = async () => {
    try {
      const response = await fetch(`http://localhost:9120/api/blog/${id}`);
      const jsonData = await response.json();
      setLoading(false);
      setBlog(jsonData);
      //console.log(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getBlogbyId();
  }, [id]);

  //date formatter
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  }

  const firstName = blog.author ? blog.author.firstName : "";
  const lastName = blog.author ? blog.author.lastName : "";
  const authorDP = blog.author ? blog.author.profilePic : "";
  const body = blog.body;

  //get user info
  const userDetails = JSON.parse(localStorage.getItem("userInfo"));
  const userId = userDetails._id;
  const userName = userDetails.username;

  const { user } = useGlobalContext();
  const isLogged = user; // Check if user exists

  const [commentText, setCommentText] = useState("");
  const [comment, setComment] = useState({
    text: "",
    postedBy: userId,
    userName: userName,
  });

  const handleCommentChange = (e) => {
    setComment({ ...comment, [e.target.name]: e.target.value });
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const newComment = await commentonBlog(id, comment);
      console.log(newComment);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    if (!user || !isLogged) {
      window.location.href = "/login";
    }
  }, [isLogged, user]);

  return (
    <div className="my-4">
      <BlogContainer>
        <BlogHeader
          title={blog.title}
          author={firstName + " " + lastName}
          authorDP={authorDP}
          date={formatDate(blog.createdAt)}
          tags={blog.tags}
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div dangerouslySetInnerHTML={{ __html: body }} />
        </div>
        <br />
        <br />

        <div className="flex justify-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <BlogsBookmarksLikes />
        </div>

        <hr className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 border-green-300" />

        {/* Comment Section */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 p-4">
          <h2 className="text-2xl font-bold mb-4">Comments</h2>
          <form onSubmit={handleCommentSubmit}>
            <input
              type="text"
              className="border border-gray-400 rounded py-2 px-3 mb-2 w-full"
              name="text"
              placeholder="Write a comment..."
              value={comment.text}
              onChange={handleCommentChange}
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Post Comment
            </button>
          </form>

          <div className="mt-4">
            {blog.comments &&
              blog.comments.map((comment, index) => (
                <div key={index} className="bg-gray-200 p-2 rounded mb-2">
                  <div className="font-bold mb-1">@{comment.userName}</div>
                  <div>{comment.text}</div>
                </div>
              ))}
          </div>
        </div>
      </BlogContainer>
    </div>
  );
}
