const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConversationSchema = new Schema({
  // An array of the two (or more) user IDs in the chat
  participants: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  lastMessage: {
    text: String,
    sender: { type: Schema.Types.ObjectId, ref: 'User' },
    timestamp: { type: Date, default: Date.now }
  }
}, {
  timestamps: true, // Creates createdAt and updatedAt
});

module.exports = mongoose.model('Conversation', ConversationSchema);