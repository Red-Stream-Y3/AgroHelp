import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
    getForums,
    getForumById,
    createForum,
    updateForum,
    deleteForum,
    searchForums,
    subscribeToForum,
    unsubscribeFromForum,
    getSubscribedForums,
    likeForum,
    unlikeForum,
    getLikedForums,
    dislikeForum,
    undislikeForum,
    getDislikedForums,
    replyToForum,
    deleteReplyFromForum,
    editReplyOnForum,
    likeReplyOnForum,
    unlikeReplyOnForum,
    dislikeReplyOnForum,
    undislikeReplyOnForum,
    acceptReplyAsAnswer,
    resolveForum,
} from "../controllers/forumController.js";

const router = express.Router();

router.route("/").get(getForums).post(protect, createForum); //TODO: add protect middleware

router
    .route("/:id")
    .get(getForumById)
    .put(protect, updateForum)
    .delete(protect, deleteForum);

router.route("/search").get(searchForums);
router.route("/subscribe/:id").post(protect, subscribeToForum);
router.route("/unsubscribe/:id").post(protect, unsubscribeFromForum);
router.route("/subscribed").get(protect, getSubscribedForums);
router.route("/like/:id").post(protect, likeForum);
router.route("/unlike/:id").post(protect, unlikeForum);
router.route("/liked").get(protect, getLikedForums);
router.route("/dislike/:id").post(protect, dislikeForum);
router.route("/undislike/:id").post(protect, undislikeForum);
router.route("/disliked").get(protect, getDislikedForums);
router.route("/reply/:id").post(protect, replyToForum);

router
    .route("/reply/:id/:replyId")
    .delete(protect, deleteReplyFromForum)
    .put(protect, editReplyOnForum);

router.route("/reply/like/:id/:replyId").post(protect, likeReplyOnForum);
router.route("/reply/unlike/:id/:replyId").post(protect, unlikeReplyOnForum);
router.route("/reply/dislike/:id/:replyId").post(protect, dislikeReplyOnForum);

router
    .route("/reply/undislike/:id/:replyId")
    .post(protect, undislikeReplyOnForum);

router.route("/reply/accept/:id/:replyId").post(protect, acceptReplyAsAnswer);
router.route("/resolve/:id").post(protect, resolveForum);

export default router;