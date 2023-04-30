import Visit from '../models/visitModel.js';
import asyncHandler from 'express-async-handler';

//@desc     Get visits
//@route    GET /api/visits
//@access   Public
const getVisits = asyncHandler(async (req, res) => {
  const visitorCount = await Visit.findOne();
  res.json(visitorCount);
});

export { getVisits };
