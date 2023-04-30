import express from 'express';
import { getVisits } from '../controllers/visitController';

const router = express.Router();

router.route('/visits').get(getVisits);

export default router;
