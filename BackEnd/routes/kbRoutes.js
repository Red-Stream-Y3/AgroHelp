import express from 'express';
import { createArticle, updateArticle, deleteArticle, getArticleById, getArticles, searchArticles} from '../controllers/kbController.js';

const router = express.Router();

router.route('/').get(getArticles).post(createArticle);
router.route('/:id').get(getArticleById).put(updateArticle).delete(deleteArticle);
router.route('/search/:keyword').get(searchArticles);

export default router;