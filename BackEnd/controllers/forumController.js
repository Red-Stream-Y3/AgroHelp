import Forum from "../models/forumModel.js";
import asyncHandler from "express-async-handler";

// @desc    Fetch all forums
// @route   GET /api/forums
// @access  Public
const getForums = asyncHandler(async (req, res) => {
    const query = models.Forum.find({}).sort({ createdAt: -1 }).limit(10);
    await query.exec(err, forums => {
        if (err) {
            res.status(404).send({message: "Forums not found"});
        } else {
            res.json(forums);
        }
    });
});

// @desc    Fetch single forum by id
// @route   GET /api/forums/:id
// @access  Public
const getForumById = asyncHandler(async (req, res) => {
    const forum = await Forum.findById(req.params.id);

    if (forum) {
        res.json(forum);
    } else {
        res.status(404).send({message: "Forum not found"});
    }
});

// @desc    Create a forum
// @route   POST /api/forums
// @access  Private/Admin
const createForum = asyncHandler(async (req, res) => {
    const forum = new Forum({
        userID: req.body.user._id,
        username: req.body.user.username,
        title: req.body.forum.title,
        content: req.body.forum.content,
    });

    const createdForum = await forum.save();
    res.status(201).json(createdForum);
});

// @desc    Update a forum
// @route   PUT /api/forums/:id
// @access  Private/Admin
const updateForum = asyncHandler(async (req, res) => {
    const { title, content } = req.body.forum;

    const forum = await Forum.findById(req.params.id);

    if (forum) {
        forum.title = title;
        forum.content = content;

        const updatedForum = await forum.save();
        res.json(updatedForum);
    } else {
        res.status(404).send({message: "Forum not found"});
    }
});

// @desc    Delete a forum
// @route   DELETE /api/forums/:id
// @access  Private/Admin
const deleteForum = asyncHandler(async (req, res) => {
    const forum = await Forum.findById(req.params.id);

    if (forum) {
        await forum.remove();
        res.json({ message: "Forum removed" });
    } else {
        res.status(404).send({message: "Forum not found"});
    }
});

// @desc    Search forums
// @route   GET /api/forums/search
// @access  Public
const searchForums = asyncHandler(async (req, res) => {
    const { title } = req.body.forum;

    const forums = await Forum.find({
        title: { $regex: title, $options: "g" },
    });

    if (forums) {
        res.json(forums);
    } else {
        res.status(404).send({message: "No forums found"});
    }
});

// @desc    Subscribe to a forum
// @route   PUT /api/forums/:id/subscribe
// @access  Private
const subscribeToForum = asyncHandler(async (req, res) => {
    const forum = await Forum.findById(req.params.id);

    if (forum) {
        forum.subscribers.push(req.body.user._id);
        forum.save();
        res.json({ message: "Subscribed to forum" });
    } else {
        res.status(404).send({message: "Forum not found"});
    }
});

// @desc    Unsubscribe from a forum
// @route   PUT /api/forums/:id/unsubscribe
// @access  Private
const unsubscribeFromForum = asyncHandler(async (req, res) => {
    const forum = await Forum.findById(req.params.id);

    if (forum) {
        forum.subscribers.pull(req.body.user._id);
        forum.save();
        res.json({ message: "Unsubscribed from forum" });
    } else {
        res.status(404).send({message: "Forum not found"});
    }
});

// @desc    Get subscribed forums
// @route   GET /api/forums/subscribed
// @access  Private
const getSubscribedForums = asyncHandler(async (req, res) => {
    const forums = await Forum.find({
        subscribers: { $in: [req.body.user._id] },
    });

    if (forums) {
        res.json(forums);
    } else {
        res.status(404).send({message: "No forums found"});
    }
});

// @desc    Like a forum
// @route   PUT /api/forums/:id/like
// @access  Private
const likeForum = asyncHandler(async (req, res) => {
    const forum = await Forum.findById(req.params.id);

    if (forum) {
        forum.likes.push(req.body.user._id);
        forum.save();
        res.json({ message: "Liked forum" });
    } else {
        res.status(404).send({message: "Forum not found"});
    }
});

// @desc    Unlike a forum
// @route   PUT /api/forums/:id/unlike
// @access  Private
const unlikeForum = asyncHandler(async (req, res) => {
    const forum = await Forum.findById(req.params.id);

    if (forum) {
        forum.likes.pull(req.body.user._id);
        forum.save();
        res.json({ message: "Unliked forum" });
    } else {
        res.status(404).send({message: "Forum not found"});
    }
});

// @desc    Get liked forums
// @route   GET /api/forums/liked
// @access  Private
const getLikedForums = asyncHandler(async (req, res) => {
    const forums = await Forum.find({
        likes: { $in: [req.body.user._id] },
    });

    if (forums) {
        res.json(forums);
    } else {
        res.status(404).send({message: "No forums found"});
    }
});

// @desc    Dislike a forum
// @route   PUT /api/forums/:id/dislike
// @access  Private
const dislikeForum = asyncHandler(async (req, res) => {
    const forum = await Forum.findById(req.params.id);

    if (forum) {
        forum.dislikes.push(req.body.user._id);
        forum.save();
        res.json({ message: "Disliked forum" });
    } else {
        res.status(404).send({message: "Forum not found"});
    }
});

// @desc    Undislike a forum
// @route   PUT /api/forums/:id/undislike
// @access  Private
const undislikeForum = asyncHandler(async (req, res) => {
    const forum = await Forum.findById(req.params.id);

    if (forum) {
        forum.dislikes.pull(req.body.user._id);
        forum.save();
        res.json({ message: "Undisliked forum" });
    } else {
        res.status(404).send({message: "Forum not found"});
    }
});

// @desc    Get disliked forums
// @route   GET /api/forums/disliked
// @access  Private
const getDislikedForums = asyncHandler(async (req, res) => {
    const forums = await Forum.find({
        dislikes: { $in: [req.body.user._id] },
    });

    if (forums) {
        res.json(forums);
    } else {
        res.status(404).send({message: "No forums found"});
    }
});

// @desc    post a reply on a forum
// @route   PUT /api/forums/:id/reply
// @access  Private
const replyToForum = asyncHandler(async (req, res) => {
    const forum = await Forum.findById(req.params.id);

    if (forum) {
        const reply = {
            userID: req.body.user._id,
            username: req.body.user.username,
            content: req.body.content,
        };

        forum.replies.push(reply);
        forum.save();
        res.json({ message: "Replied to forum" });
    } else {
        res.status(404).send({message: "Forum not found"});
    }
});

// @desc    Delete a reply on a forum
// @route   DELETE /api/forums/:id/reply
// @access  Private
const deleteReplyFromForum = asyncHandler(async (req, res) => {
    const forum = await Forum.findById(req.params.id);

    if (forum) {
        forum.replies.pull(req.body.replyID); //TODO: check if this works
        forum.save();
        res.json({ message: "Deleted reply from forum" });
    } else {
        res.status(404).send({message: "Forum not found"});
    }
});

// @desc    Edit a reply on a forum
// @route   PUT /api/forums/:id/reply
// @access  Private
const editReplyOnForum = asyncHandler(async (req, res) => {
    const forum = await Forum.findById(req.params.id);

    if (forum) {
        const reply = forum.replies.find(
            (reply) => reply._id.toString() === req.body.replyID
        );

        if (reply) {
            reply.content = req.body.content;
            forum.save();
            res.json({ message: "Edited reply" });
        } else {
            res.status(404).send({message: "Reply not found"});
        }
    } else {
        res.status(404).send({message: "Forum not found"});
    }
});

// @desc    Like a reply on a forum
// @route   PUT /api/forums/:id/reply/like
// @access  Private
const likeReplyOnForum = asyncHandler(async (req, res) => {
    const forum = await Forum.findById(req.params.id);

    if (forum) {
        const reply = forum.replies.find(
            (reply) => reply._id.toString() === req.body.replyID
        );

        if (reply) {
            reply.likes.push(req.body.user._id);
            forum.save();
            res.json({ message: "Liked reply" });
        } else {
            res.status(404).send({message: "Reply not found"});
        }
    } else {
        res.status(404).send({message: "Forum not found"});
    }
});

// @desc    Unlike a reply on a forum
// @route   PUT /api/forums/:id/reply/unlike
// @access  Private
const unlikeReplyOnForum = asyncHandler(async (req, res) => {
    const forum = await Forum.findById(req.params.id);
    
    if (forum) {
        const reply = forum.replies.find(
            (reply) => reply._id.toString() === req.body.replyID
        );

        if (reply) {
            reply.likes.pull(req.body.user._id);
            forum.save();
            res.json({ message: "Unliked reply" });
        } else {
            res.status(404).send({message: "Reply not found"});
        }
    } else {
        res.status(404).send({message: "Forum not found"});
    }
});

// @desc    Dislike a reply on a forum
// @route   PUT /api/forums/:id/reply/dislike
// @access  Private
const dislikeReplyOnForum = asyncHandler(async (req, res) => {
    const forum = await Forum.findById(req.params.id);

    if (forum) {
        const reply = forum.replies.find(
            (reply) => reply._id.toString() === req.body.replyID
        );

        if (reply) {
            reply.dislikes.push(req.body.user._id);
            forum.save();
            res.json({ message: "Disliked reply" });
        } else {
            res.status(404).send({message: "Reply not found"});
        }
    } else {
        res.status(404).send({message: "Forum not found"});
    }
});

// @desc    Undislike a reply on a forum
// @route   PUT /api/forums/:id/reply/undislike
// @access  Private
const undislikeReplyOnForum = asyncHandler(async (req, res) => {
    const forum = await Forum.findById(req.params.id);

    if (forum) {
        const reply = forum.replies.find(
            (reply) => reply._id.toString() === req.body.replyID
        );

        if (reply) {
            reply.dislikes.pull(req.body.user._id);
            forum.save();
            res.json({ message: "Undisliked reply" });
        } else {
            res.status(404).send({message: "Reply not found"});
        }
    } else {
        res.status(404).send({message: "Forum not found"});
    }
});

// @desc    Mark reply as accepted answer
// @route   PUT /api/forums/:id/reply/accept
// @access  Private
const acceptReplyAsAnswer = asyncHandler(async (req, res) => {
    const forum = await Forum.findById(req.params.id);

    if (forum) {
        const reply = forum.replies.find(
            (reply) => reply._id.toString() === req.body.replyID
        );

        if (reply) {
            forum.acceptedAnswer = reply;
            forum.save();
            res.json({ message: "Accepted reply as answer" });
        } else {
            res.status(404).send({message: "Reply not found"});
        }
    } else {
        res.status(404).send({message: "Forum not found"});
    }
});

// @desc    Mark forum as resolved
// @route   PUT /api/forums/:id/resolve
// @access  Private
const resolveForum = asyncHandler(async (req, res) => {
    const forum = await Forum.findById(req.params.id);

    if (forum) {
        forum.resolved = true;
        forum.save();
        res.json({ message: "Forum Resolved" });
    } else {
        res.status(404).send({message: "Forum not found"});
    }
});

export { 
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
    resolveForum
};
