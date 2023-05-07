import express from 'express';
import {
  getCropDiseases,
  getCropDiseaseById,
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

const diseaseRoutes = express.Router();

diseaseRoutes.route('/').get(getCropDiseases).post(createCropDisease);
diseaseRoutes.route('/random').get(getRandomCropDiseases);
diseaseRoutes
  .route('/:id')
  .get(getCropDiseaseById)
  .delete(deleteCropDisease)
  .put(updateCropDisease);
diseaseRoutes
  .route('/:id/accept')
  .put(updateDiseaseAccept);
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
  .route('/bookmark')
  .get(getDiseaseBookmarksByUser);

export default diseaseRoutes;
