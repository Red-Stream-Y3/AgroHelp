import express from 'express';
import { getCropDiseases, getCropDiseaseById, deleteCropDisease, createCropDisease, updateCropDisease, searchCropDisease } from '../controllers/diseaseController.js';

const cropDiseaseRoutes = express.Router();

cropDiseaseRoutes.route('/').get(getCropDiseases).post(createCropDisease);
cropDiseaseRoutes.route('/:id').get(getCropDiseaseById).delete(deleteCropDisease).put(updateCropDisease);
cropDiseaseRoutes.route('/search/:cropDiseaseName').get(searchCropDisease);

export default cropDiseaseRoutes;