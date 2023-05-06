import express from 'express';
import { createBlog, updateBlog, deleteBlog,getBlogsByAuthor, searchBlogs, getBlogById, getBlogs, createBlogComment, deleteBlogComment, likeBlog, dislikeBlog} from '../controllers/blogController.js';

const router = express.Router();

router.route('/').get(getBlogs).post(createBlog);
router.route('/:id').get(getBlogById).put(updateBlog).delete(deleteBlog);
router.route('/comment/:id').post(createBlogComment);
router.route('/search/:blogTitle').get(searchBlogs);
router.route('/comment/:id/:commentId').delete(deleteBlogComment);
router.route('/like/:id').post(likeBlog);
router.route('/dislike/:id').post(dislikeBlog);
router.route('/author/:id').get(getBlogsByAuthor);

export default router;