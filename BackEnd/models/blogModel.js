/** @format */

import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  postedAt: {
    type: Date,
    default: Date.now,
  },
});

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: [
    {
      type: {
        type: String,
        enum: ["text", "image"],
        required: false,
      },
      content: {
        type: String,
        required: true,
      },
    },
  ],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  tags: {
    type: [String],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },

  comments: [commentSchema],

  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
