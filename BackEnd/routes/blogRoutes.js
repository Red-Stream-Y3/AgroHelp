import express from 'express';
import { createBlog, updateBlog, deleteBlog, searchBlogs, getBlogById, getBlogs, createBlogComment, deleteBlogComment} from '../controllers/blogController.js';

const router = express.Router();

router.route('/').get(getBlogs).post(createBlog);
router.route('/:id').get(getBlogById).put(updateBlog).delete(deleteBlog);
router.route('/comment/:id').post(createBlogComment);
router.route('/search/:blogTitle').get(searchBlogs);
router.route('/comment/:id/:commentId').delete(deleteBlogComment);

export default router;