import Crop from '../models/cropModel.js';
import asyncHandler from 'express-async-handler';

// @desc    Fetch all crops
// @route   GET /api/crops
// @access  Public
const getCrops = asyncHandler(async (req, res) => {
  try {
    const crops = await Crop.find({}).populate('author', 'firstName lastName');
    res.json(crops);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

// @desc    Fetch single crop
// @route   GET /api/crops/:id
// @access  Public
const getCropById = asyncHandler(async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.id);
    if (crop) {
      res.json(crop);
    } else {
      res.status(404);
      throw new Error('Crop not found');
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});


// @desc    Fetch all accepted crops
// @route   GET /api/crops/accepted
// @access  Public
const getAllAcceptedCrops = asyncHandler(async (req, res) => {
  try {
    const crops = await Crop.find({ isAccepted: true });
    if (crops) {
      res.json(crops);
      console.log('crops', crops);
    } else {
      res.status(404);
      throw new Error('Crops not found');
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

// @desc    Delete a crop
// @route   DELETE /api/crops/:id
// @access  Private/Admin
const deleteCrop = asyncHandler(async (req, res) => {
  try {
    const crop = await Crop.findByIdAndDelete(req.params.id);
    if (crop) {
      res.json({ message: 'Crop removed' });
    } else {
      res.status(404);
      throw new Error('Crop not found');
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

// @desc    Create a crop
// @route   POST /api/crops
// @access  Private/Admin
const createCrop = asyncHandler(async (req, res) => {
  try {
    const {
      cropName,
      scientificName,
      cropFamily,
      cropType,
      cropIntro,
      cropImage,
      cropInfo,
      otherInfo,
      author,
    } = req.body;

    // check scientific name
    const cropExists = await Crop.findOne({ scientificName });
    if (cropExists) {
      res.status(400);
      throw new Error('Crop already exists');
    }
    // const authorId = req.body.author;

    // // let authorId = null;
    // // if (req.user && req.user._id) {
    // //   authorId = req.user._id;
    // // }

    const crop = new Crop({
      cropName,
      scientificName,
      cropFamily,
      cropType,
      cropIntro,
      cropImage,
      cropInfo,
      otherInfo,
      author,
    });

    const createdCrop = await crop.save();

    res.status(201).json(createdCrop);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

// @desc    Update a crop
// @route   PUT /api/crops/:id
// @access  Private/Admin
const updateCrop = asyncHandler(async (req, res) => {
  try {
    const {
      cropName,
      scientificName,
      cropFamily,
      cropType,
      cropIntro,
      cropImage,
      cropInfo,
      otherInfo,
    } = req.body;

    const crop = await Crop.findById(req.params.id);

    if (crop) {
      crop.cropName = cropName;
      crop.scientificName = scientificName;
      crop.cropFamily = cropFamily;
      crop.cropType = cropType;
      crop.cropIntro = cropIntro;
      crop.cropImage = cropImage;
      crop.cropInfo = cropInfo;
      crop.otherInfo = otherInfo;

      const updatedCrop = await crop.save();
      res.json(updatedCrop);
    } else {
      res.status(404);
      throw new Error('Crop not found');
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

// @desc    search crops
// @route   GET /api/crops/search/:searchTerm
// @access  Public
const searchCrops = asyncHandler(async (req, res) => {
  try {
    const searchTerm = req.params.q;
    const crops = await Crop.find({
      cropName: { $regex: new RegExp(`^${searchTerm}`, 'i') },
    });
    res.json(crops);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

//@desc     Get latest 4 crops 
//@route    GET /api/crops/short
//@access   Public
const getShortCrops = asyncHandler(async (req, res) => {
  try {
    const crops = await Crop.find({}).limit(4);
    if (crops) {
      res.json(crops);
    }
    else {
      res.status(404);
      throw new Error('Crops not found');
    }
  }
  catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

// @desc    Update crop accept
// @route   PUT /api/crops/:id/accept
// @access  Private/Admin
const updateCropAccept = asyncHandler(async (req, res) => {
  const crop = await Crop.findById(req.params.id);

  if (crop) {
    crop.isAccepted = req.body.isAccepted || crop.isAccepted;

    const updatedCrop = await crop.save();

    res.json(updatedCrop);
  } else {
    res.status(404);
    throw new Error('Crop not found');
  }
});

//@desc     Get crops by author
//@route    GET /api/crops/author/:id
//@access   Public
const getCropsByAuthor = asyncHandler(async (req, res) => {
  try {
    const crops = await Crop.find({ author: req.params.id });
    if (crops) {
      res.json(crops);
    } else {
      res.status(404);
      throw new Error('Crops not found');
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

//@desc     ADD/REMOVE crop bookmark
//@route    PUT /api/crops/:id/bookmark
//@access   Private

const addRemoveCropBookmark = asyncHandler(async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.id);
    if (crop) {
      if (crop.bookmarkedBy.filter(
        (bookmark) => bookmark.toString() === req.body.userId.toString()
      ).length > 0
      ) {
        crop.bookmarkedBy = crop.bookmarkedBy.filter(
          (bookmark) => bookmark.toString() !== req.body.userId.toString()
        );
      } else {
        crop.bookmarkedBy.push(req.body.userId);
      }
      const updatedCrop = await crop.save();
      res.json(updatedCrop);
    } else {
      res.status(404);
      throw new Error('Crop not found');
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});



const getCropBookmarksByUser = asyncHandler(async (req, res) => {
  try {
    const crops = await Crop.find({ bookmarkedBy: req.params.id });
    if (crops) {
      res.json(crops);
    } else {
      res.status(404);
      throw new Error('Crops not found');
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

export {
  getCrops,
  getCropById,
  getAllAcceptedCrops,
  deleteCrop,
  createCrop,
  updateCrop,
  searchCrops,
  getShortCrops,
  updateCropAccept,
  getCropsByAuthor,
  addRemoveCropBookmark,
  getCropBookmarksByUser,
};
