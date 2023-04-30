import Visit from '../models/visitModel.js';
import asyncHandler from 'express-async-handler';

//@desc     Get visits
//@route    GET /api/visits
//@access   Public
const getVisits = asyncHandler(async (req, res) => {
  const date = new Date().setHours(0, 0, 0, 0); // Get today's date at midnight
  let visitor = await Visit.findOne({ date });

  if (!visitor) {
    visitor = await Visit.create({ date, count: 1 });
  } else {
    visitor.count++;
    await visitor.save();
  }

  res.json(visitor);
});

export { getVisits };
