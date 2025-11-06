const User = require('../models/User');

// @desc    Get all approved alumni with filters
// @route   GET /api/directory
exports.searchAlumni = async (req, res) => {
  try {
    const { industry, city, major, isMentor, skills, name } = req.query;

    // Start with the base query: must be an approved user
    const filterQuery = { status: 'Approved' };

    // Build the filter object from query params
    if (industry) filterQuery.industry = { $regex: industry, $options: 'i' };
    if (city) filterQuery.city = { $regex: city, $options: 'i' };
    if (major) filterQuery.major = { $regex: major, $options: 'i' };
    if (name) filterQuery.fullName = { $regex: name, $options: 'i' };
    if (isMentor === 'true') filterQuery.isMentor = true;
    
    // For skills (assuming skills is a comma-separated string)
    if (skills) {
      const skillsArray = skills.split(',')
                                .map(skill => new RegExp(skill.trim(), 'i'));
      filterQuery.skills = { $in: skillsArray };
    }

    const users = await User.find(filterQuery)
                            .select('-password -email') // Protect private info
                            .sort({ fullName: 1 }); // Sort alphabetically
    
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// --- NEW FUNCTION ---

// @desc    Get a single alumni profile by ID
// @route   GET /api/directory/:userId
exports.getAlumniProfileById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
                           .select('-password -email'); // Protect private data

    if (!user) {
      return res.status(404).json({ msg: 'Alumni profile not found' });
    }

    // Check if user is approved (optional, but good practice)
    if (user.status !== 'Approved') {
       return res.status(404).json({ msg: 'This profile is not active.' });
    }

    res.json(user);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Alumni profile not found' });
    }
    res.status(500).send('Server Error');
  }
};