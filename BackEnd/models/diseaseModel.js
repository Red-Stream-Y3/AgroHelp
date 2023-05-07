import mongoose from 'mongoose';
import User from './userModel.js';
const Schema = mongoose.Schema;

const cropDiseaseSchema = new Schema(
  {
    diseaseName: {
      type: String,
      required: true,
    },
    diseaseImage: [
      {
        type: String,
        required: true,
      },
    ],
    diseaseSymptoms: {
      type: String,
      required: true,
    },
    diseaseCause: {
      type: String,
      required: true,
    },
    diseasePrevention: {
      type: String,
      required: true,
    },
    diseaseTreatment: {
      type: String,
      required: true,
    },
    diseaseCrops: [
      {
        type: String,
        required: true,
      },
    ],
    diseaseType: {
      type: String,
      required: true,
    },
    diseaseStatus: {
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
  { timestamps: true }
);

const CropDisease = mongoose.model('CropDisease', cropDiseaseSchema);

export default CropDisease;
