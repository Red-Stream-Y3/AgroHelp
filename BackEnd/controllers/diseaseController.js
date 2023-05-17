import CropDisease from '../models/diseaseModel.js';
import asyncHandler from 'express-async-handler';

//@desc     Get all crop diseases
//@route    GET /api/cropDiseases
//@access   Public
const getCropDiseases = asyncHandler(async (req, res) => {
  try {
    const cropDiseases = await CropDisease.find({}).populate(
      'author',
      'firstName lastName'
    );
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
      throw new Error('Crop disease not found');
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

//@desc     Get all accepted crop diseases
//@route    GET /api/cropDiseases/accepted
//@access   Public
const getAllAcceptedCropDiseases = asyncHandler(async (req, res) => {
  try {
    const cropDiseases = await CropDisease.find({ isAccepted: true });
    if (cropDiseases) {
      res.json(cropDiseases);
      console.log('cropDiseases', cropDiseases);
    } else {
      res.status(404);
      throw new Error('Crop diseases not found');
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
    const cropDisease = await CropDisease.findByIdAndDelete(req.params.id);
    if (cropDisease) {
      res.json({ message: 'Crop disease removed' });
    } else {
      res.status(404);
      throw new Error('Crop disease not found');
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
      diseaseStatus,
      author,
    } = req.body;

    // check disease
    const diseaseExists = await CropDisease.findOne({ diseaseName });
    if (diseaseExists) {
      res.status(400);
      throw new Error('Disease already exists');
    }

    // let authorId = null;
    // if (req.user && req.user._id) {
    //   authorId = req.user._id;
    // }

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
      author,
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
      diseaseStatus,
      isAccepted,
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
      cropDisease.isAccepted = isAccepted;

      const updatedCropDisease = await cropDisease.save();
      res.json(updatedCropDisease);
    } else {
      res.status(404);
      throw new Error('Crop disease not found');
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

//@desc     search crop disease
//@route    GET /api/cropDiseases/search/:searchTerm
//@access   Public
const searchCropDisease = asyncHandler(async (req, res) => {
  try {
    const searchTerm = req.params.q;
    const cropDiseases = await CropDisease.find({
      diseaseName: { $regex: new RegExp(`^${searchTerm}`, 'i') },
    });
    if (cropDiseases) {
      res.json(cropDiseases);
    } else {
      res.status(404);
      throw new Error('Crop disease not found');
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

//@desc    get latest 4 crop diseases
//@route   GET /api/cropDiseases/random
//@access  Public
const getRandomCropDiseases = asyncHandler(async (req, res) => {
  try {
    const cropDiseases = await CropDisease.find({}).limit(4);
    if (cropDiseases) {
      res.json(cropDiseases);
    } else {
      res.status(404);
      throw new Error('Crop disease not found');
    }
  }
  catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

// @desc    Update disease accept
// @route   PUT /api/diseases/:id/accept
// @access  Private/Admin
const updateDiseaseAccept = asyncHandler(async (req, res) => {
  const disease = await CropDisease.findById(req.params.id);

  if (disease) {
    disease.isAccepted = req.body.isAccepted || disease.isAccepted;

    const updatedDisease = await disease.save();

    res.json(updatedDisease);
  } else {
    res.status(404);
    throw new Error('Disease not found');
  }
});

//@desc    get diseases by author
//@route   GET /api/diseases/author/:id
//@access  Public

const getDiseasesByAuthor = asyncHandler(async (req, res) => {
  try {
    const diseases = await CropDisease.find({ author: req.params.id });
    if (diseases) {
      res.json(diseases);
    } else {
      res.status(404);
      throw new Error('Diseases not found');
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

//@desc    add or remove disease bookmark
//@route   PUT /api/diseases/bookmark/:id
//@access  Private

const addRemoveDiseaseBookmark = asyncHandler(async (req, res) => {
  try {
    const disease = await CropDisease.findById(req.params.id);
    if (disease) {
      if (
        disease.bookmarkedBy.filter(
          (bookmark) => bookmark.toString() === req.body.userId.toString()
        ).length > 0
      ) {
        disease.bookmarkedBy = disease.bookmarkedBy.filter(
          (bookmark) => bookmark.toString() !== req.body.userId.toString()
        );
      } else {
        disease.bookmarkedBy.push(req.body.userId);
      }
      const updatedDisease = await disease.save();
      res.json(updatedDisease);
    } else {
      res.status(404);
      throw new Error('Disease not found');
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

const getDiseaseBookmarksByUser = asyncHandler(async (req, res) => {
  try {
    const diseases = await CropDisease.find({ bookmarkedBy: req.params.id });
    if (diseases) {
      res.json(diseases);
    } else {
      res.status(404);
      throw new Error('Diseases not found');
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

export {
  getCropDiseases,
  getCropDiseaseById,
  getAllAcceptedCropDiseases,
  deleteCropDisease,
  createCropDisease,
  updateCropDisease,
  updateDiseaseAccept,
  searchCropDisease,
  getRandomCropDiseases,
  getDiseasesByAuthor,
  addRemoveDiseaseBookmark,
  getDiseaseBookmarksByUser,
};
