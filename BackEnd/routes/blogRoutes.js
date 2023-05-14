import express from 'express';
import {
  createBlog,
  updateBlog,
  deleteBlog,
  searchBlogs,
  getBlogById,
  getBlogs,
  createBlogComment,
  deleteBlogComment,
  likeBlog,
  dislikeBlog,
  updateBlogAccept,
  blogCommentAccept,
  getBlogsByAuthor,
  bookmarkBlog,
  getBookmarkedBlogs,
  getLatestBlogs
} from '../controllers/blogController.js';

const router = express.Router();

router.route('/').get(getBlogs).post(createBlog);
router.route('/new').get(getLatestBlogs);
router.route('/:id').get(getBlogById).put(updateBlog).delete(deleteBlog);
router.route('/:id/accept').put(updateBlogAccept);
router.route('/:id/comment').put(blogCommentAccept);
router.route('/comment/:id').post(createBlogComment);
router.route('/search/q=:q').get(searchBlogs);
router.route('/comment/:id/:commentId').delete(deleteBlogComment);
router.route('/like/:id').post(likeBlog);
router.route('/dislike/:id').post(dislikeBlog);
router.route('/author/:id').get(getBlogsByAuthor);
router.route('/bookmark/:id').post(bookmarkBlog);
router.route('/bookmark/:id').get(getBookmarkedBlogs);

export default router;
