import mongoose from 'mongoose';

// Define the database model for forum
const forumSchema = new mongoose.Schema(
  {
    userID: {
      type: String,
      required: true,
      ref: 'User',
    },
    username: {
      type: String,
      required: true,
    },
    resolved: {
      type: Boolean,
      required: false,
      default: false,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: false,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    dislikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    replies: [
      {
        userID: {
          type: String,
          required: true,
        },
        username: {
          type: String,
          required: true,
        },
        accepted: {
          type: Boolean,
          required: false,
          default: false,
        },
        content: {
          type: String,
          required: true,
        },
        likes: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
          },
        ],
        dislikes: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
          },
        ],
      },
    ],
    subscribers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Create the model for forum
const Forum = mongoose.model('Forum', forumSchema);

// Export the model for forum
export default Forum;
