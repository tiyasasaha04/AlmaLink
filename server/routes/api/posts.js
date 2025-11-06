const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/authMiddleware');
const { createPost, getAllPosts, likePost } = require('../../controllers/postController')

router.use(authMiddleware);

// @route   POST /api/posts
router.post('/', createPost);

// @route   GET /api/posts
router.get('/', getAllPosts);

// @route   PUT /api/posts/like/:id
router.put('/like/:id', likePost);

module.exports = router;