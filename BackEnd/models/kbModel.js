// model for knowledbase articles
import mongoose from 'mongoose';

const kbSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  body: [
    {
      type: {
        type: String,
        enum: ['text', 'image', 'video'],
        required: true
      },
      content: {
        type: String,
        required: true
      }
    }
  ],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  articleType: {
    type: String,
    enum: ['plant', 'disease', 'pest', 'other'],
    default: 'other'
  },
  tags: {
    type: [String],
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const KnowledgeBase = mongoose.model('KnowledgeBase', kbSchema);

export default KnowledgeBase;
