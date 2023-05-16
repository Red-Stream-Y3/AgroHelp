/** @format */

import React, { useEffect, useState } from 'react';
import { BlogContainer, BlogHeader } from '../../components';
import { useParams } from 'react-router-dom';
import { BsBookmarkCheckFill, BsBookmarkPlus } from 'react-icons/bs';
import { useGlobalContext } from '../../context/ContextProvider';
import { toast } from 'react-toastify';
import {
  getBlogById,
  commentonBlog,
  likeBlog,
  disLikeBlog,
  handleBlogBookamrk,
} from '../../api/blog';
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiFillDislike,
  AiFillLike,
} from 'react-icons/ai';

export default function BlogView() {
  const { id } = useParams();
  const [blog, setBlog] = React.useState({});
  const [isLogged, setIsLogged] = useState(false);
  const [loading, setLoading] = useState(false);

  //likes handler
  const [liked, setLiked] = useState(false);
  const [disLiked, setDisliked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const [numLikes, setNumLikes] = useState(0);
  const [numDislikes, setNumDislikes] = useState(0);

  //get user info
  let userId;
  let userName;

  const userDetails = JSON.parse(localStorage.getItem('userInfo'));
  if (userDetails) {
    userId = userDetails._id;
    userName = userDetails.username;
  }

  useEffect(() => {
    if (userDetails) {
      setIsLogged(true);
    }
  }, []);

  //get blog by id
  useEffect(() => {
    try {
      const fetchBlog = async () => {
        const blog = await getBlogById(id);
        setLoading(true);
        setBlog(blog);
        //console.log(blog);
      };
      fetchBlog();
      setLoading(false);
    } catch (error) {
      console.log('error', error);
    }
  }, [id]);

  //date formatter
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  }

  //refresh blog object
  const refreshBlog = async () => {
    setLoading(true);
    let res = await getBlogById(id);
    setBlog(res);
    setLoading(false);
  };

  const firstName = blog.author ? blog.author.firstName : '';
  const lastName = blog.author ? blog.author.lastName : '';
  const authorDP = blog.author ? blog.author.profilePic : '';
  const authorID = blog.author ? blog.author._id : '';
  const body = blog.body ? blog.body : '';
  const tags = blog.tags ? blog.tags : [];
  const tagsAsString = tags.join(', ');

  //comments handler
  const [comment, setComment] = useState({
    text: '',
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
      toast.success('Comment Posted!', {
        hideProgressBar: false,
        closeOnClick: true,
        autoClose: 1500,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      refreshBlog();
    } catch (err) {
      console.error(err.message);
    }
  };

  //check like and dislike status
  useEffect(() => {
    //count likes and dislikes
    if (blog.likes && blog.dislikes) {
      setNumLikes(blog.likes.length);
      setNumDislikes(blog.dislikes.length);

      //check if user has liked or disliked
      if (blog.likes.length > 0 && blog.likes.includes(userId)) {
        setLiked(true);
      } else {
        setLiked(false);
      }

      if (blog.dislikes.length > 0 && blog.dislikes.includes(userId)) {
        setDisliked(true);
      } else {
        setDisliked(false);
      }
    }
  }, [blog]);

  //like handler
  const handleLike = async () => {
    let res = await likeBlog(id, userId);
    if (res.message === 'Unliked Blog') {
      setLiked(false);
      setDisliked(false);
    } else if (res.message === 'Liked Blog') {
      setLiked(true);
      setDisliked(false);
    }
    await refreshBlog();
  };

  //dislike handler
  const handleDisLike = async () => {
    let res = await disLikeBlog(id, userId);
    if (res.message === 'Removed Dislike') {
      setDisliked(false);
      setLiked(false);
    } else if (res.message === 'Disliked Blog') {
      setDisliked(true);
      setLiked(false);
    }
    await refreshBlog();
  };

  //check if user has bookmarked
  useEffect(() => {
    if (blog.bookmarked) {
      if (blog.bookmarked.length > 0 && blog.bookmarked.includes(userId)) {
        setBookmarked(true);
        //console.log("bookmarked");
      } else {
        setBookmarked(false);
        //console.log("not bookmarked");
      }
    }
  }, [blog]);

  const handleBookmark = async () => {
    let res = await handleBlogBookamrk(id, userId);
    if (res.msg === 'Removed Bookmark') {
      setBookmarked(false);
    } else if (res.msg === 'Bookmarked Blog') {
      setBookmarked(true);
    }
    await refreshBlog();
  };

  return (
    <div className="my-4">
      <BlogContainer>
        <BlogHeader
          title={blog.title}
          author={firstName + ' ' + lastName}
          authorDP={authorDP}
          date={formatDate(blog.createdAt)}
          tags={tagsAsString}
          authorId={authorID}
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <div dangerouslySetInnerHTML={{ __html: body }} />
        </div>
        <br />
        <br />
        <hr className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 border-green-300" />

        {/* Likes and Bookmarks */}
        <div className="flex items-center justify-center pb-6 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-x-8">
          <div className="flex items-center space-x-2">
            <button
              onClick={handleLike}
              className="transition-all text-blue-400 ease-in-out active:scale-110 hover:bg-blue-100 rounded-full px-2 py-2"
            >
              {liked ? <AiFillLike size={24} /> : <AiOutlineLike size={24} />}
            </button>
            <div className="text-sm font-bold text-gray-200">{numLikes}</div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleDisLike}
              className="transition-all text-red-400 ease-in-out active:scale-110 hover:bg-red-200 rounded-full px-2 py-2"
            >
              {disLiked ? (
                <AiFillDislike size={24} />
              ) : (
                <AiOutlineDislike size={24} />
              )}
            </button>
            <div className="text-gray-200 text-sm font-bald">{numDislikes}</div>
          </div>

          <div className="flex items-center">
            <button onClick={handleBookmark}>
              {bookmarked ? (
                <BsBookmarkCheckFill size={24} className="text-yellow-300" />
              ) : (
                <BsBookmarkPlus size={24} className="text-gray-100" />
              )}
            </button>
          </div>
        </div>

        {/* likes ends here */}
        <hr className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 border-green-300" />

        {/* Comment Section */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 p-4">
          <h2 className="text-2xl font-bold mb-4 text-white">Comments</h2>

          {isLogged && (
            <form onSubmit={handleCommentSubmit}>
              <input
                type="text"
                className="border border-gray-400 rounded py-2 px-3 mb-2 w-full bg-lightbg text-white"
                name="text"
                placeholder="Write a comment..."
                value={comment.text}
                onChange={handleCommentChange}
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-1 rounded"
              >
                Post Comment
              </button>
              <hr className="my-5" />
            </form>
          )}

          <div className="mt-4">
            {blog.comments &&
              blog.comments.map(
                (comment, index) =>
                  comment.isPosted && (
                    <div
                      key={index}
                      className="bg-darkbg bg-opacity-70 text-white p-2 rounded mb-2"
                    >
                      <div className="font-bold mb-1">@{comment.userName}</div>
                      <div>{comment.text}</div>
                    </div>
                  )
              )}
          </div>
        </div>
      </BlogContainer>
    </div>
  );
}
