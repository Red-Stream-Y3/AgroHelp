import express from 'express';
import { createBlog, updateBlog, deleteBlog, getBlogById, getBlogs, createBlogComment} from '../controllers/blogController.js';

const router = express.Router();

router.route('/').get(getBlogs).post(createBlog);
router.route('/:id').get(getBlogById).put(updateBlog).delete(deleteBlog);
router.route('/:id/comment').post(createBlogComment);

export default router;