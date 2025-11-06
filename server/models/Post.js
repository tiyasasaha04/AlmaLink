const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const PostSchema = new Schema({
  text: { type: String, required: true },
  author: { 
    type: Schema.Types.ObjectId, 
    ref: 'User' 
  },
  likes: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'User' 
  }],
  comments: [CommentSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('Post', PostSchema);