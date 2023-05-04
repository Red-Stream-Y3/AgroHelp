import express from 'express';
import { createBlog, updateBlog, deleteBlog, searchBlogs, getBlogById, getBlogs, createBlogComment} from '../controllers/blogController.js';

const router = express.Router();

router.route('/').get(getBlogs).post(createBlog);
router.route('/:id').get(getBlogById).put(updateBlog).delete(deleteBlog);
router.route('/:id/comment').post(createBlogComment);
router.route('/search/:blogTitle').get(searchBlogs);
export default router;