import express from 'express';
import { getCrops, getCropById, deleteCrop, createCrop, updateCrop, searchCrops } from '../controllers/cropController.js';

const cropRouter = express.Router();

cropRouter.route('/').get(getCrops).post(createCrop);
cropRouter.route('/:id').get(getCropById).delete(deleteCrop).put(updateCrop);
cropRouter.route('/search/:cropName').get(searchCrops);

export default cropRouter;
