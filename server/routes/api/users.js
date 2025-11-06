const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/authMiddleware');
const adminMiddleware = require('../../middleware/adminMiddleware');
const {
  getPendingUsers,
  approveUser,
  rejectUser,
  getAllUsers
} = require('../../controllers/userController');

// All routes in this file are protected and require an admin
router.use(authMiddleware, adminMiddleware);

// @route   GET /api/users
// @desc    Get all users
router.get('/', getAllUsers);

// @route   GET /api/users/pending
// @desc    Get all users pending approval
router.get('/pending', getPendingUsers);

// @route   PUT /api/users/approve/:id
// @desc    Approve a user
router.put('/approve/:id', approveUser);

// @route   PUT /api/users/reject/:id
// @desc    Reject a user
router.put('/reject/:id', rejectUser);

module.exports = router;