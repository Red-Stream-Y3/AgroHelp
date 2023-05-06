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
    getLikedForums,
    dislikeForum,
    getDislikedForums,
    replyToForum,
    deleteReplyFromForum,
    editReplyOnForum,
    likeReplyOnForum,
    dislikeReplyOnForum,
    acceptReplyAsAnswer,
    resolveForum,
    getMyForums,
} from "../controllers/forumController.js";

const router = express.Router();

router.route("/").get(getForums).post(protect, createForum);

router
    .route("/:id")
    .get(getForumById)
    .put(protect, updateForum)
    .delete(protect, deleteForum);

router.route("/search/q=:q").get(searchForums);
router.route("/subscribe/:id").post(protect, subscribeToForum);
router.route("/unsubscribe/:id").post(protect, unsubscribeFromForum);
router.route("/subscribed/:user").get(protect, getSubscribedForums);
router.route("/like/:id").post(protect, likeForum);
router.route("/liked/:user").get(protect, getLikedForums);
router.route("/dislike/:id").post(protect, dislikeForum);
router.route("/disliked/:user").get(protect, getDislikedForums);
router.route("/reply/:id").post(protect, replyToForum);

router
    .route("/reply/:id/:replyid")
    .delete(protect, deleteReplyFromForum)
    .put(protect, editReplyOnForum);

router.route("/reply/like/:id/:replyid").post(protect, likeReplyOnForum);
router.route("/reply/dislike/:id/:replyid").post(protect, dislikeReplyOnForum);

router.route("/reply/accept/:id/:replyid").post(protect, acceptReplyAsAnswer);
router.route("/resolve/:id").post(protect, resolveForum);
router.route("/myforums/:user").get(protect, getMyForums);

export default router;