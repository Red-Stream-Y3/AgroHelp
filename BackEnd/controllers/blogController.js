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
    const blog = await Blog.findById(req.params.id).populate('author', 'username firstName lastName profilePic');
    if (blog) {
        res.json(blog);
    } else {
        res.status(404);
        throw new Error("Blog not found");
    }
});

// @desc    Delete a blog blog
// @route   DELETE /api/blog/:id
// @access  Private/Admin
const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findByIdAndDelete(req.params.id);
  if (blog) {
    res.json({ message: 'Blog removed' });
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

    const tags = req.body.tags.split(",").map((tag) => tag.trim());

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
  const { title, body, author, tags, isAccepted, likesCount} = req.body;
  const blog = await Blog.findById(req.params.id);

  if (blog) {
    blog.title = title;
    blog.body = body;
    blog.author = author;
    blog.tags = tags;
    blog.updatedAt = Date.now();
    blog.isAccepted = isAccepted;
    blog.likesCount = likesCount;

    const updatedBlog = await blog.save();
    res.json(updatedBlog);
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
      userName
    };

    blog.comments.push(newComment);

    const updatedBlog = await blog.save();
    res.status(201).json(updatedBlog);
  } else {
    res.status(404);
    throw new Error('Blog not found');
  }
});

// @desc    Search blogs
// @route   GET /api/blog/search
// @access  Public
const searchBlogs = asyncHandler(async (req, res) => {
    try{
        const blog = await Blog.find({ blogTitle: { $regex: req.query.q, $options: "i" } });
        res.json(blog);
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: "Blog not found" });
    }
}); 

// @desc    Like a blog
// @route   PUT /api/blog/like/:id
// @access  Private
const likeBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (blog) {
    if (blog.likes.find((like) => like.user.toString() === req.user._id.toString())) {
      blog.likes = blog.likes.filter((like) => like.user.toString() !== req.user._id.toString());
    } else {
      blog.likes.push({ user: req.user._id });
    }

    await blog.save();
    res.json(blog);
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
    const comment = blog.comments.find((comment) => comment.postedBy.toString() === req.params.commentId.toString());

    if (comment) {
      blog.comments = blog.comments.filter((comment) => comment.postedBy.toString() !== req.params.commentId.toString());
      await blog.save();
      res.json({ message: 'Comment removed' });
    } else {
      res.status(404);
      throw new Error('Comment not found');
    }
  } else {
    res.status(404);
    throw new Error('Blog not found');
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
    deleteBlogComment
}