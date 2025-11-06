const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../../controllers/authController');
const { body } = require('express-validator'); // We can add validation later

// --- NEW IMPORTS ---
const authMiddleware = require('../../middleware/authMiddleware'); // Import
const User = require('../../models/User'); // Import

// @route    POST api/auth/register
// @desc     Register a new alumnus
// @access   Public
router.post(
  '/register',
  [
    // We can add express-validator rules here for robust validation
    body('fullName', 'Full name is required').not().isEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body('enrollmentNumber', 'Enrollment number is required').not().isEmpty(),
    body('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
  ],
  registerUser
);

// @route    POST api/auth/login
// @desc     Authenticate user & get token (Login)
// @access   Public
router.post(
  '/login',
  [
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password is required').exists(),
  ],
  loginUser
);

// --- NEW ROUTE ---

// @route   GET api/auth/me
// @desc    Get currently logged in user
// @access  Private
router.get('/me', authMiddleware, async (req, res) => {
  try {
    // req.user.id is set by authMiddleware
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);
  } catch (err)
 {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;