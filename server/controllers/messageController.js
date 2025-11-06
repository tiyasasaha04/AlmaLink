const Message = require('../models/Message');
const Conversation = require('../models/Conversation');

// @desc    Send a new message
// @route   POST /api/messages/:conversationId
exports.sendMessage = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const { text } = req.body;
    const senderId = req.user.id;

    // 1. Create and save the new message
    const newMessage = new Message({
      conversationId,
      sender: senderId,
      text,
    });
    const savedMessage = await newMessage.save();

    // 2. Update the 'lastMessage' in the conversation
    await Conversation.findByIdAndUpdate(conversationId, {
      lastMessage: {
        text: savedMessage.text,
        sender: savedMessage.sender,
        timestamp: savedMessage.createdAt
      }
    });

    // Note: The 'sendMessage' socket event will handle real-time push
    // We just return the saved message here for confirmation
    
    // Populate sender info before returning
    const populatedMessage = await savedMessage.populate('sender', 'fullName profilePicture');

    res.status(201).json(populatedMessage);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Get all messages for a conversation
// @route   GET /api/messages/:conversationId
exports.getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;

    // Check if user is part of this conversation (security)
    const conversation = await Conversation.findById(conversationId);
    if (!conversation.participants.includes(req.user.id)) {
      return res.status(403).json({ msg: 'Not authorized for this conversation' });
    }

    const messages = await Message.find({ conversationId })
      .populate('sender', 'fullName profilePicture') // Get sender's info
      .sort({ createdAt: 1 }); // Oldest first (chronological)

    res.json(messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};