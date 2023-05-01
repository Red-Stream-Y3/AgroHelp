import CropDisease from '../models/diseaseModel.js';
import asyncHandler from "express-async-handler";

//@desc     Get all crop diseases
//@route    GET /api/cropDiseases
//@access   Public
const getCropDiseases = asyncHandler(async (req, res) => {
    try {
        const cropDiseases = await CropDisease.find({});
        res.json(cropDiseases);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
});

//@desc     Get single crop disease
//@route    GET /api/cropDiseases/:id
//@access   Public
const getCropDiseaseById = asyncHandler(async (req, res) => {
    try {
        const cropDisease = await CropDisease.findById(req.params.id);
        if (cropDisease) {
            res.json(cropDisease);
        } else {
            res.status(404);
            throw new Error("Crop disease not found");
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
});

//@desc     Delete a crop disease
//@route    DELETE /api/cropDiseases/:id
//@access   Private/Admin
const deleteCropDisease = asyncHandler(async (req, res) => {
    try {
        const cropDisease = await CropDisease.findById(req.params.id);
        if (cropDisease) {
            await cropDisease.remove();
            res.json({ message: "Crop disease removed" });
        } else {
            res.status(404);
            throw new Error("Crop disease not found");
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
});

//@desc     Create a crop disease
//@route    POST /api/cropDiseases
//@access   Private/Admin
const createCropDisease = asyncHandler(async (req, res) => {
    try {
        const {
            diseaseName,
            diseaseImage,
            diseaseSymptoms,
            diseaseCause,
            diseasePrevention,
            diseaseTreatment,
            diseaseCrops,
            diseaseType,
            diseaseStatus
        } = req.body;
        const cropDisease = new CropDisease({
            diseaseName,
            diseaseImage,
            diseaseSymptoms,
            diseaseCause,
            diseasePrevention,
            diseaseTreatment,
            diseaseCrops,
            diseaseType,
            diseaseStatus,
            author : req.user._id
        });
        const createdCropDisease = await cropDisease.save();
        res.status(201).json(createdCropDisease);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
});

//@desc     Update a crop disease
//@route    PUT /api/cropDiseases/:id
//@access   Private/Admin
const updateCropDisease = asyncHandler(async (req, res) => {
    try {
        const {
            diseaseName,
            diseaseImage,
            diseaseSymptoms,
            diseaseCause,
            diseasePrevention,
            diseaseTreatment,
            diseaseCrops,
            diseaseType,
            diseaseStatus
        } = req.body;
        const cropDisease = await CropDisease.findById(req.params.id);
        if (cropDisease) {
            cropDisease.diseaseName = diseaseName;
            cropDisease.diseaseImage = diseaseImage;
            cropDisease.diseaseSymptoms = diseaseSymptoms;
            cropDisease.diseaseCause = diseaseCause;
            cropDisease.diseasePrevention = diseasePrevention;
            cropDisease.diseaseTreatment = diseaseTreatment;
            cropDisease.diseaseCrops = diseaseCrops;
            cropDisease.diseaseType = diseaseType;
            cropDisease.diseaseStatus = diseaseStatus;
            const updatedCropDisease = await cropDisease.save();
            res.json(updatedCropDisease);
        } else {
            res.status(404);
            throw new Error("Crop disease not found");
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
}
);

//@desc     search crop disease
//@route    GET /api/cropDiseases/search/:keyword
//@access   Public
const searchCropDisease = asyncHandler(async (req, res) => {
    try {
        const keyword = req.params.keyword;
        const cropDiseases = await CropDisease.find({ diseaseName: { $regex: keyword, $options: 'i' } });
        if (cropDiseases) {
            res.json(cropDiseases);
        } else {
            res.status(404);
            throw new Error("Crop disease not found");
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
});

export { getCropDiseases, getCropDiseaseById, deleteCropDisease, createCropDisease, updateCropDisease, searchCropDisease };