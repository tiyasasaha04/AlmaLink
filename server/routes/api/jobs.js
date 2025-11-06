const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/authMiddleware');
const { createJob, getAllJobs } = require('../../controllers/jobController');

router.use(authMiddleware);

// @route   POST /api/jobs
router.post('/', createJob);

// @route   GET /api/jobs
router.get('/', getAllJobs);

module.exports = router;