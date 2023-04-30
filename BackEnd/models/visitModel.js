import mongoose from 'mongoose';

const visitSchema = mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    count: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Visit = mongoose.model('Visit', visitSchema);

export default Visit;
