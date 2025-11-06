const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/authMiddleware');
const { sendMessage, getMessages } = require('../../controllers/messageController');

router.use(authMiddleware);

// @route   POST /api/messages/:conversationId
router.post('/:conversationId', sendMessage);

// @route   GET /api/messages/:conversationId
router.get('/:conversationId', getMessages);

module.exports = router;