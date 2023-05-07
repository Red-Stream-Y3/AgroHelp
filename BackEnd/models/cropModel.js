import mongoose from 'mongoose';
import User from './userModel.js';

const Schema = mongoose.Schema;

const cropInfoSchema = new Schema({
  climate: {
    type: String,
    required: true,
  },
  season: {
    type: String,
    required: true,
  },
  seedType: {
    type: String,
    required: true,
  },
  soil: {
    type: String,
    required: true,
  },
  fieldPreparation: {
    type: String,
    required: true,
  },
  fertilizer: {
    type: String,
    required: true,
  },
  irrigation: {
    type: String,
    required: true,
  },
  weedControl: {
    type: String,
    required: true,
  },
  pestControl: {
    type: String,
    required: true,
  },
  harvesting: {
    type: String,
    required: true,
  },
  yield: {
    type: String,
    required: true,
  },
  storage: {
    type: String,
    required: true,
  },
});

const cropSchema = new Schema(
  {
    cropName: {
      type: String,
      required: true,
    },
    scientificName: {
      type: String,
      required: true,
      unique: true,
    },
    cropFamily: {
      type: String,
      required: true,
    },
    cropType: {
      type: String,
      required: true,
    },
    cropIntro: {
      type: String,
      required: true,
    },
    cropImage: {
      type: String,
      // required: true,
    },
    cropInfo: {
      type: cropInfoSchema,
      required: true,
    },
    otherInfo: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: User,
    },
    isAccepted: {
      type: Boolean,
      default: false,
    },
    bookmarkedBy: [
      {
        type: Schema.Types.ObjectId,
        ref: User,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Crop = mongoose.model('Crop', cropSchema);

export default Crop;
