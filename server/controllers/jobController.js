const Job = require('../models/Job');
const User = require('../models/User');

// @desc    Create a new job posting
// @route   POST /api/jobs
exports.createJob = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    const newJob = new Job({
      ...req.body,
      postedBy: req.user.id
    });

    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Get all job postings
// @route   GET /api/jobs
exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find()
                         .populate('postedBy', 'fullName headline profilePicture')
                         .sort({ createdAt: -1 }); // Newest first
    res.json(jobs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};