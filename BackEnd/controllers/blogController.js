/** @format */

import Blog from '../models/blogModel.js';
import asyncHandler from 'express-async-handler';

// @desc    Fetch all blog blogs
// @route   GET /api/blog
// @access  Public
const getBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find({}).populate(
    'author',
    'username firstName lastName'
  );
  res.json(blogs);
});

// @desc    Fetch single blog blog
// @route   GET /api/blog/:id
// @access  Public
const getBlogById = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate(
    'author',
    'username firstName lastName profilePic'
  );
  if (blog) {
    res.status(200).json(blog);
  } else {
    res.status(404);
    throw new Error('Blog not found');
  }
});

// @desc    Delete a blog blog
// @route   DELETE /api/blog/:id
// @access  Private/Admin
const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findByIdAndDelete(req.params.id);
  if (blog) {
    res.status(200).json({ message: 'Blog removed' });
  } else {
    res.status(404);
    throw new Error('Blog not found');
  }
});

// @desc    Create a blog blog
// @route   POST /api/blog
// @access  Private/Admin
const createBlog = asyncHandler(async (req, res) => {
  const { title, body, author } = req.body;

  const tags = req.body.tags.split(',').map((tag) => tag.trim());

  const blog = new Blog({
    title,
    body,
    author,
    tags,
  });

  const createdBlog = await blog.save();
  res.status(201).json(createdBlog);
});

// @desc    Update a blog blog
// @route   PUT /api/blog/:id
// @access  Private/Admin
const updateBlog = asyncHandler(async (req, res) => {
  const { title, body, author, tags } = req.body;
  const blog = await Blog.findById(req.params.id);

  if (blog) {
    blog.title = title;
    blog.body = body;
    blog.author = author;
    blog.tags = tags;
    blog.updatedAt = Date.now();
    //blog.isAccepted = isAccepted;

    const updatedBlog = await blog.save();
    res.status(200).json(updatedBlog);
  } else {
    res.status(404);
    throw new Error('Blog not found');
  }
});

// @desc    Create new comment
// @route   POST /api/blog/comment/:id
// @access  Private
const createBlogComment = asyncHandler(async (req, res) => {
  const { text, postedBy, userName } = req.body;
  const blog = await Blog.findById(req.params.id);

  if (blog) {
    const newComment = {
      text,
      postedBy,
      userName,
    };

    blog.comments.push(newComment);

    const updatedBlog = await blog.save();
    res.status(201).json(updatedBlog);
  } else {
    res.status(404);
    throw new Error('Blog not found');
  }
});

// @desc    Delete a blog comment
// @route   DELETE /api/blog/comment/:id/:commentId
// @access  Private
const deleteBlogComment = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (blog) {
    const commentIndex = blog.comments.findIndex(
      (comment) => comment._id.toString() === req.params.commentId
    );

    if (commentIndex !== -1) {
      blog.comments.splice(commentIndex, 1);
      const updatedBlog = await blog.save();
      res.json(updatedBlog);
    } else {
      res.status(404);
      throw new Error('Comment not found');
    }
  }
});

// @desc    Search blogs
// @route   GET /api/blog/search/:blogTitle
// @access  Public
const searchBlogs = asyncHandler(async (req, res) => {
  try {
    const searchTerm = req.params.q;
    const blog = await Blog.find({
      title: { $regex: new RegExp(`^${searchTerm}`, 'i') },
    }).populate('author', 'username firstName lastName');
    res.json(blog);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: 'Blog not found' });
  }
});

// @desc    Like a blog
// @route   PUT /api/blog/like/:id
// @access  Private
const likeBlog = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  const blog = await Blog.findById(req.params.id);
  let message = '';

  if (blog) {
    //if user already liked the blog remove like
    if (blog.likes.includes(userId)) {
      blog.likes.pull(userId);
      message = 'Unliked Blog';
    } else {
      //if user has disliked the blog remove dislike
      if (blog.dislikes.includes(userId)) {
        blog.dislikes.pull(userId);
      }
      blog.likes.push(userId);
      message = 'Liked Blog';
    }
    blog.save();
    res.status(200).json({ message: message });
  } else {
    res.status(404).send({ message: 'Blog not found' });
  }
});

// @desc dislike a blog
// @route PUT /api/blog/dislike/:id
// @access Private
const dislikeBlog = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  const blog = await Blog.findById(req.params.id);
  let message = '';

  if (blog) {
    //if user already disliked the blog remove dislike
    if (blog.dislikes.includes(userId)) {
      blog.dislikes.pull(userId);
      message = 'Removed Dislike';
    } else {
      //if user has liked the blog remove like
      if (blog.likes.includes(userId)) {
        blog.likes.pull(userId);
      }

      blog.dislikes.push(userId);
      message = 'Disliked Blog';
    }
    blog.save();
    res.status(200).json({ message: message });
  } else {
    res.status(404).send({ message: 'Blog not found' });
  }
});

// @desc    Bookmark a blog
// @route   PUT /api/blog/bookmark/:id
// @access  Private
const bookmarkBlog = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  const blog = await Blog.findById(req.params.id);
  let message = '';

  if (blog) {
    //if user already bookmarked the blog remove bookmark
    if (blog.bookmarked.includes(userId)) {
      blog.bookmarked.pull(userId);
      message = 'Removed Bookmark';
    } else {
      blog.bookmarked.push(userId);
      message = 'Bookmarked Blog';
    }
    blog.save();
    res.status(200).json({ msg: message });
  } else {
    res.status(404).send({ message: 'Blog not found' });
  }
});

// @desc    Get user's bookmarked blogs
// @route   GET /api/blog/bookmark/:id
// @access  Private
const getBookmarkedBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find({ bookmarked: req.params.id }).populate(
    'author',
    'username firstName lastName'
  );
  res.json(blogs);
});

// @desc    Update Blog accept
// @route   PUT /api/blog/:id/accept
// @access  Private/Admin
const updateBlogAccept = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (blog) {
    blog.isAccepted = req.body.isAccepted || blog.isAccepted;

    const updatedBlog = await blog.save();

    res.json(updatedBlog);
  } else {
    res.status(404);
    throw new Error('Blog not found');
  }
});

// @desc    Fetch blogs by author
// @route   GET /api/blog/author/:id
// @access  Public
const getBlogsByAuthor = asyncHandler(async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.params.id }).populate(
      'author',
      'firstName lastName profilePic username'
    );
    if (blogs) {
      res.json(blogs);
    } else {
      res.status(404).json({ message: 'No blogs found' });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: 'Blog not found' });
  }
});

// @desc    Update Blog Comment accept
// @route   PUT /api/blog/comment/:id/accept
// @access  Private/Admin
const blogCommentAccept = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (blog) {
    const comment = blog.comments.find(
      (comment) => comment._id.toString() === req.body._id
    );

    if (comment) {
      comment.isPosted = req.body.isPosted || comment.isPosted;
      await blog.save();

      res.json(blog);
    } else {
      res.status(404);
      throw new Error('Comment not found');
    }
  } else {
    res.status(404);
    throw new Error('Blog not found');
  }
});

// @desc    GEt random 4 blogs
// @route   GET /api/blog/random
// @access  Public

const getLatestBlogs = asyncHandler(async (req, res) => {
  try {
    const latestBlogPosts = await Blog.find({ isAccepted: true })
      .sort({ createdAt: -1 })
      .limit(4)
      .populate('author', 'username firstName lastName');
    if (latestBlogPosts) {
      res.status(200).json(latestBlogPosts);
    } else {
      throw new Error('No blogs found');
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: 'No blogs found' });
  }
});

export {
  getBlogs,
  getBlogById,
  deleteBlog,
  createBlog,
  updateBlog,
  createBlogComment,
  searchBlogs,
  deleteBlogComment,
  likeBlog,
  dislikeBlog,
  updateBlogAccept,
  getBlogsByAuthor,
  blogCommentAccept,
  bookmarkBlog,
  getBookmarkedBlogs,
  getLatestBlogs,
};
