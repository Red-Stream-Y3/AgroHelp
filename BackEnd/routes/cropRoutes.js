import express from 'express';
import {
  getCrops,
  getCropById,
  deleteCrop,
  createCrop,
  updateCrop,
  updateCropAccept,
  searchCrops,
  getShortCrops,
} from '../controllers/cropController.js';

const cropRouter = express.Router();

cropRouter.route('/').get(getCrops).post(createCrop);
cropRouter.route('/short').get(getShortCrops);
cropRouter.route('/:id').get(getCropById).delete(deleteCrop).put(updateCrop);
cropRouter.route('/:id/accept').put(updateCropAccept);
cropRouter.route('/search/:cropName').get(searchCrops);

export default cropRouter;
