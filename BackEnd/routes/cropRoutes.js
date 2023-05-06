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
  getCropsByAuthor,
} from '../controllers/cropController.js';

const cropRouter = express.Router();

cropRouter.route('/').get(getCrops).post(createCrop);
cropRouter.route('/short').get(getShortCrops);
cropRouter.route('/:id').get(getCropById).delete(deleteCrop).put(updateCrop);
cropRouter.route('/:id/accept').put(updateCropAccept);
cropRouter.route('/search/q=:q').get(searchCrops);
cropRouter.route('/author/:id').get(getCropsByAuthor);

export default cropRouter;
