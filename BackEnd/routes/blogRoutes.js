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
} from '../controllers/blogController.js';

const router = express.Router();

router.route('/').get(getBlogs).post(createBlog);
router.route('/:id').get(getBlogById).put(updateBlog).delete(deleteBlog);
router.route('/:id/accept').put(updateBlogAccept);
router.route('/comment/:id').post(createBlogComment);
router.route('/search/:blogTitle').get(searchBlogs);
router.route('/comment/:id/:commentId').delete(deleteBlogComment);
router.route('/like/:id').post(likeBlog);
router.route('/dislike/:id').post(dislikeBlog);

export default router;
