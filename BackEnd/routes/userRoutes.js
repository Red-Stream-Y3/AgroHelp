import express from 'express';
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  requestRole,
  getAuthorInfoById,
} from '../controllers/userController.js';
import { protect, admin, adminMod } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(registerUser).get(protect, adminMod, getUsers);
router.post('/login', authUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, adminMod, getUserById)
  .put(protect, adminMod, updateUser);
router.route('/:id/request').put(protect, requestRole);
router.route('/:id/author').get(getAuthorInfoById);

export default router;
