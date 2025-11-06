const User = require('../models/User');

// @desc    Get current user's profile
// @route   GET /api/profile/me
exports.getMyProfile = async (req, res) => {
  try {
    // req.user.id comes from the authMiddleware
    const user = await User.findById(req.user.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Update current user's profile
// @route   PUT /api/profile/me
exports.updateMyProfile = async (req, res) => {
  // Destructure all the fields from our data model
  const {
    fullName,
    headline,
    currentRole,
    currentCompany,
    industry,
    city,
    country,
    graduationYear,
    degree,
    major,
    clubs,
    hostel,
    skills, // These will come in as comma-separated strings
    isMentor,
    mentorshipAreas, // Comma-separated
    expertise,       // Comma-separated
    linkedinProfile,
    githubProfile,
    twitterProfile
  } = req.body;

  // Build the profile object
  const profileFields = {};
  
  // We attach the user ID from the token
  profileFields.user = req.user.id;

  // --- Core Identity & Professional ---
  if (fullName) profileFields.fullName = fullName;
  if (headline) profileFields.headline = headline;
  if (currentRole) profileFields.currentRole = currentRole;
  if (currentCompany) profileFields.currentCompany = currentCompany;
  if (industry) profileFields.industry = industry;
  if (city) profileFields.city = city;
  if (country) profileFields.country = country;

  // --- Academic ---
  if (graduationYear) profileFields.graduationYear = graduationYear;
  if (degree) profileFields.degree = degree;
  if (major) profileFields.major = major;
  if (hostel) profileFields.hostel = hostel;

  // --- Arrays (from comma-separated strings) ---
  const toArray = (str) => str.split(',').map(item => item.trim()).filter(Boolean);
  if (clubs) profileFields.clubs = toArray(clubs);
  if (skills) profileFields.skills = toArray(skills);
  if (mentorshipAreas) profileFields.mentorshipAreas = toArray(mentorshipAreas);
  if (expertise) profileFields.expertise = toArray(expertise);

  // --- Mentor Status ---
  // We check 'isMentor' explicitly, as it's a boolean
  if (isMentor === true || isMentor === false) {
    profileFields.isMentor = isMentor;
  }

  // --- Links ---
  if (linkedinProfile) profileFields.linkedinProfile = linkedinProfile;
  if (githubProfile) profileFields.githubProfile = githubProfile;
  if (twitterProfile) profileFields.twitterProfile = twitterProfile;
  
  try {
    let user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    
    // Update the user
    user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: profileFields },
      { new: true, runValidators: true } // 'new: true' returns the updated doc
    ).select('-password');

    res.json({ msg: 'Profile updated successfully', user });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};