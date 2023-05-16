import express from 'express';
import {
  getCrops,
  getCropById,
  getAllAcceptedCrops,
  deleteCrop,
  createCrop,
  updateCrop,
  updateCropAccept,
  searchCrops,
  getShortCrops,
  getCropsByAuthor, 
  getCropBookmarksByUser, 
  addRemoveCropBookmark
} from '../controllers/cropController.js';
import { protect, adminContributor, admin } from '../middleware/authMiddleware.js';

const cropRouter = express.Router();

cropRouter.route('/').get(getCrops).post(protect, adminContributor, createCrop);
cropRouter.route('/short').get(getShortCrops);
cropRouter.route('/:id').get(getCropById).delete(protect, adminContributor, deleteCrop).put(protect, adminContributor, updateCrop);
cropRouter.route('/:id/accept').put(protect, admin , updateCropAccept);
cropRouter.route('/search/q=:q').get(searchCrops);
cropRouter.route('/author/:id').get(getCropsByAuthor);
cropRouter.route('/bookmark/:id').put(addRemoveCropBookmark);
cropRouter.route('/bookmarks/:id').get(getCropBookmarksByUser);
cropRouter.route('/accepted').get(getAllAcceptedCrops);


export default cropRouter;
