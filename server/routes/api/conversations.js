const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/authMiddleware');
const {
  startOrGetConversation,
  getMyConversations,
} = require('../../controllers/conversationController');

// All routes are private
router.use(authMiddleware);

// @route   GET /api/conversations/me
router.get('/me', getMyConversations);

// @route   POST /api/conversations/:recipientId
router.post('/:recipientId', startOrGetConversation);

module.exports = router;