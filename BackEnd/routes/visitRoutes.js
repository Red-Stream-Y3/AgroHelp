import express from 'express';
import { getVisits } from '../controllers/visitController.js';

const router = express.Router();

router.route('/').get(getVisits);

export default router;
