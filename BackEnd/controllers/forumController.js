import Forum from '../models/forumModel.js';
import asyncHandler from 'express-async-handler';

// @desc    Fetch all forums
// @route   GET /api/forums
// @access  Public
const getForums = asyncHandler(async (req, res) => {
  const forums = await Forum.find({})
    .sort({ createdAt: -1 })
    .limit(10)
    .populate('userID', 'firstName lastName username');

  if (!forums) {
    res.status(404).send({ message: 'Forums not found' });
  } else {
    res.json(forums);
  }
});

// @desc    Fetch single forum by id
// @route   GET /api/forums/:id
// @access  Public
const getForumById = asyncHandler(async (req, res) => {
  const forum = await Forum.findById(req.params.id);

  if (forum) {
    res.status(200).json(forum);
  } else {
    res.status(404).send({ message: 'Forum not found' });
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
  res.status(256).json(createdForum);
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
    res.status(200).json(updatedForum);
  } else {
    res.status(404).send({ message: 'Forum not found' });
  }
});

// @desc    Delete a forum
// @route   DELETE /api/forums/:id
// @access  Private/Admin
const deleteForum = asyncHandler(async (req, res) => {
  const forum = await Forum.findByIdAndDelete(req.params.id);

  if (forum) {
    res.status(255).json({ message: 'Forum removed' });
  } else {
    res.status(404).send({ message: 'Forum not found' });
  }
});

// @desc    Search forums
// @route   GET /api/forums/search/q=:q
// @access  Public
const searchForums = asyncHandler(async (req, res) => {
  const title = req.params.q;

  const forums = await Forum.find({
    title: { $regex: title, $options: 'i' },
  });

  if (forums) {
    res.json(forums);
  } else {
    res.status(404).send({ message: 'No forums found' });
  }
});

// @desc    Subscribe to a forum
// @route   POST /api/forums/:id/subscribe
// @access  Private
const subscribeToForum = asyncHandler(async (req, res) => {
  const forum = await Forum.findById(req.params.id);

  if (forum) {
    forum.subscribers.push(req.body.user._id);
    forum.save();
    res.status(255).json({ message: 'Subscribed to forum' });
  } else {
    res.status(404).send({ message: 'Forum not found' });
  }
});

// @desc    Unsubscribe from a forum
// @route   POST /api/forums/:id/unsubscribe
// @access  Private
const unsubscribeFromForum = asyncHandler(async (req, res) => {
  const forum = await Forum.findById(req.params.id);

  if (forum) {
    forum.subscribers.pull(req.body.user._id);
    forum.save();
    res.status(255).json({ message: 'Unsubscribed from forum' });
  } else {
    res.status(404).send({ message: 'Forum not found' });
  }
});

// @desc    Get subscribed forums
// @route   GET /api/forums/subscribed/:user
// @access  Private
const getSubscribedForums = asyncHandler(async (req, res) => {
  const forums = await Forum.find({
    subscribers: { $in: [req.params.user] },
  });

  if (forums) {
    res.json(forums);
  } else {
    res.status(404).send({ message: 'No forums found' });
  }
});

// @desc    Like / unlike a forum
// @route   POST /api/forums/like/:id
// @access  Private
const likeForum = asyncHandler(async (req, res) => {
  const forum = await Forum.findById(req.params.id);
  let message = '';

  if (forum) {
    // If user has liked the forum, remove like
    if (forum.likes.includes(req.body.user._id)) {
      forum.likes.pull(req.body.user._id);
      message = 'Unliked forum';
    } else {
      // If user has disliked the forum, remove dislike
      if (forum.dislikes.includes(req.body.user._id)) {
        forum.dislikes.pull(req.body.user._id);
      }

      forum.likes.push(req.body.user._id);
      message = 'Liked forum';
    }

    forum.save();
    res.status(255).json({ message: message });
  } else {
    res.status(404).send({ message: 'Forum not found' });
  }
});

// @desc    Get liked forums
// @route   GET /api/forums/liked/:user
// @access  Private
const getLikedForums = asyncHandler(async (req, res) => {
  const forums = await Forum.find({
    likes: { $in: [req.params.user] },
  });

  if (forums) {
    res.json(forums);
  } else {
    res.status(404).send({ message: 'No forums found' });
  }
});

// @desc    Dislike / undislike a forum
// @route   PUT /api/forums/dislike/:id
// @access  Private
const dislikeForum = asyncHandler(async (req, res) => {
  const forum = await Forum.findById(req.params.id);
  let message = '';

  if (forum) {
    // If user has disliked the forum, remove dislike
    if (forum.dislikes.includes(req.body.user._id)) {
      forum.dislikes.pull(req.body.user._id);
      message = 'Removed dislike';
    } else {
      // If user has liked the forum, remove like
      if (forum.likes.includes(req.body.user._id)) {
        forum.likes.pull(req.body.user._id);
      }

      forum.dislikes.push(req.body.user._id);
      message = 'Disliked forum';
    }

    forum.save();
    res.status(255).json({ message: message });
  } else {
    res.status(404).send({ message: 'Forum not found' });
  }
});

// @desc    Get disliked forums
// @route   GET /api/forums/disliked/:user
// @access  Private
const getDislikedForums = asyncHandler(async (req, res) => {
  const forums = await Forum.find({
    dislikes: { $in: [req.params.user] },
  });

  if (forums) {
    res.json(forums);
  } else {
    res.status(404).send({ message: 'No forums found' });
  }
});

// @desc    post a reply on a forum
// @route   PUT /api/forums/reply/:id
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
    res.status(255).json({ message: 'Replied to forum' });
  } else {
    res.status(404).send({ message: 'Forum not found' });
  }
});

// @desc    Delete a reply on a forum
// @route   DELETE /api/forums/reply/:id/:replyid
// @access  Private
const deleteReplyFromForum = asyncHandler(async (req, res) => {
  const forum = await Forum.findById(req.params.id);

  if (forum) {
    forum.replies.pull(req.params.replyid); //TODO: check if this works
    forum.save();
    res.status(255).json({ message: 'Deleted reply from forum' });
  } else {
    res.status(404).send({ message: 'Forum not found' });
  }
});

// @desc    Edit a reply on a forum
// @route   PUT /api/forums/:id/reply
// @access  Private
const editReplyOnForum = asyncHandler(async (req, res) => {
  const forum = await Forum.findById(req.params.id);

  if (forum) {
    const reply = forum.replies.find(
      (reply) => reply._id.toString() === req.params.replyid
    );

    if (reply) {
      reply.content = req.body.content;
      forum.save();
      res.status(255).json({ message: 'Edited reply' });
    } else {
      res.status(404).send({ message: 'Reply not found' });
    }
  } else {
    res.status(404).send({ message: 'Forum not found' });
  }
});

// @desc    Like / unlike a reply on a forum
// @route   POST /api/forums/reply/like/:id/:replyid
// @access  Private
const likeReplyOnForum = asyncHandler(async (req, res) => {
  const forum = await Forum.findById(req.params.id);
  let message = '';

  if (forum) {
    const reply = forum.replies.find(
      (reply) => reply._id.toString() === req.params.replyid
    );

    if (reply) {
      // If user has liked the reply, remove like
      if (reply.likes.includes(req.body.user._id)) {
        reply.likes.pull(req.body.user._id);
        message = 'Removed like';
      } else {
        // If user has disliked the reply, remove dislike
        if (reply.dislikes.includes(req.body.user._id)) {
          reply.dislikes.pull(req.body.user._id);
        }

        reply.likes.push(req.body.user._id);
        message = 'Liked reply';
      }
      forum.save();
      res.status(255).json({ message: message });
    } else {
      res.status(404).send({ message: 'Reply not found' });
    }
  } else {
    res.status(404).send({ message: 'Forum not found' });
  }
});

// @desc    Dislike / undislike a reply on a forum
// @route   POST /api/forums/reply/dislike/:id/:replyid
// @access  Private
const dislikeReplyOnForum = asyncHandler(async (req, res) => {
  const forum = await Forum.findById(req.params.id);
  let message = '';

  if (forum) {
    const reply = forum.replies.find(
      (reply) => reply._id.toString() === req.params.replyid
    );

    if (reply) {
      // If user has disliked the reply, remove dislike
      if (reply.dislikes.includes(req.body.user._id)) {
        reply.dislikes.pull(req.body.user._id);
        message = 'Removed dislike';
      } else {
        // If user has liked the reply, remove like
        if (reply.likes.includes(req.body.user._id)) {
          reply.likes.pull(req.body.user._id);
        }

        reply.dislikes.push(req.body.user._id);
        message = 'Disliked reply';
      }

      forum.save();
      res.status(255).json({ message: message });
    } else {
      res.status(404).send({ message: 'Reply not found' });
    }
  } else {
    res.status(404).send({ message: 'Forum not found' });
  }
});

// @desc    Mark reply as accepted answer
// @route   POST /api/forums/reply/accept/:id/:replyid
// @access  Private
const acceptReplyAsAnswer = asyncHandler(async (req, res) => {
  const forum = await Forum.findById(req.params.id);

  if (forum) {
    const reply = forum.replies.find(
      (reply) => reply._id.toString() === req.params.replyid
    );

    if (reply) {
      reply.accepted = true;
      forum.save();
      res.status(255).json({ message: 'Accepted reply as answer' });
    } else {
      res.status(404).send({ message: 'Reply not found' });
    }
  } else {
    res.status(404).send({ message: 'Forum not found' });
  }
});

// @desc    Mark forum as resolved
// @route   POST /api/forums/resolve/:id
// @access  Private
const resolveForum = asyncHandler(async (req, res) => {
  const forum = await Forum.findById(req.params.id);

  if (forum) {
    forum.resolved = true;
    forum.save();
    res.status(255).json({ message: 'Forum Resolved' });
  } else {
    res.status(404).send({ message: 'Forum not found' });
  }
});

// @desc    Get forums that user has created
// @route   GET /api/forums/myforums/:user
// @access  Private
const getMyForums = asyncHandler(async (req, res) => {
  const forums = await Forum.find({ userID: req.params.user }).sort({
    createdAt: -1,
  });

  if (forums) {
    res.status(200).json(forums);
  } else {
    res.status(404).send({ message: 'Forums not found' });
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
};
