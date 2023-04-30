import express from 'express';
import { createBlog, updateBlog, deleteBlog, getBlogById, getBlogs} from '../controllers/blogController.js';

const router = express.Router();

router.route('/').get(getBlogs).post(createBlog);
router.route('/:id').get(getBlogById).put(updateBlog).delete(deleteBlog);

export default router;