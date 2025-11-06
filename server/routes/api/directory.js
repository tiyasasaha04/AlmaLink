const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/authMiddleware');
const { searchAlumni, getAlumniProfileById } = require('../../controllers/directoryController'); // <-- Updated import

// @route   GET /api/directory
// @desc    Search/filter all approved alumni
// @access  Private (must be logged in)
router.get('/', authMiddleware, searchAlumni);

// @route   GET /api/directory/:userId
// @desc    Get a single alumni profile by ID
// @access  Private (must be logged in)
router.get('/:userId', authMiddleware, getAlumniProfileById); // <-- Added route

module.exports = router;