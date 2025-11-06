const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/authMiddleware');
const { handleChatQuery } = require('../../controllers/chatbotController')

// @route   POST /api/chatbot/query
// @desc    Process a chatbot query
// @access  Private
router.post('/query', authMiddleware, handleChatQuery);

module.exports = router;