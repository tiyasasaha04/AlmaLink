const Conversation = require('../models/Conversation');
const User = require('../models/User');

// @desc    Start or Get a conversation with another user
// @route   POST /api/conversations/:recipientId
exports.startOrGetConversation = async (req, res) => {
  try {
    const senderId = req.user.id;
    const { recipientId } = req.params;

    // Check if a conversation between these two users already exists
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, recipientId] },
    }).populate('participants', '-password');

    if (conversation) {
      // If it exists, return it
      return res.json(conversation);
    }

    // If not, create a new one
    conversation = new Conversation({
      participants: [senderId, recipientId],
    });

    await conversation.save();
    
    // Populate participants' info before sending back
    conversation = await conversation.populate('participants', '-password');

    res.status(201).json(conversation);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Get all conversations for the logged-in user
// @route   GET /api/conversations/me
exports.getMyConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find({
      participants: req.user.id,
    })
      .populate('participants', 'fullName profilePicture headline') // Get other user's info
      .populate('lastMessage.sender', 'fullName')
      .sort({ 'lastMessage.timestamp': -1 }); // Show most recent first

    // Filter conversations to show *other* participant's info
    const populatedConversations = conversations.map(convo => {
        const otherParticipant = convo.participants.find(p => p._id.toString() !== req.user.id);
        return {
            ...convo.toObject(),
            recipient: otherParticipant // Add a 'recipient' field for easy display
        };
    });

    res.json(populatedConversations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};