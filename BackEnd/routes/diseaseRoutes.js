import express from 'express';
import {
  getCropDiseases,
  getCropDiseaseById,
  getAllAcceptedCropDiseases,
  deleteCropDisease,
  createCropDisease,
  updateCropDisease,
  searchCropDisease,
  getRandomCropDiseases,
  updateDiseaseAccept,
  getDiseasesByAuthor,
  addRemoveDiseaseBookmark,
  getDiseaseBookmarksByUser,

} from '../controllers/diseaseController.js';
import { protect, admin, adminContributor } from '../middleware/authMiddleware.js';

const diseaseRoutes = express.Router();

diseaseRoutes.route('/').get(getCropDiseases).post(protect, adminContributor, createCropDisease);
diseaseRoutes.route('/random').get(getRandomCropDiseases);
diseaseRoutes
  .route('/:id')
  .get(getCropDiseaseById)
  .delete(protect, adminContributor, deleteCropDisease)
  .put(protect, adminContributor, updateCropDisease);
diseaseRoutes
  .route('/:id/accept')
  .put(protect, admin, updateDiseaseAccept);
diseaseRoutes
  .route('/search/:cropDiseaseName')
  .get(searchCropDisease);
diseaseRoutes
  .route('/author/:id')
  .get(getDiseasesByAuthor);
diseaseRoutes
  .route('/bookmark/:id')
  .put(addRemoveDiseaseBookmark);
diseaseRoutes
  .route('/bookmarks/:id')
  .get(getDiseaseBookmarksByUser);
diseaseRoutes
  .route('/accepted')
  .get(getAllAcceptedCropDiseases);

export default diseaseRoutes;
