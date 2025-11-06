const User = require('../models/User');

// @desc    Get all users (admin only - for future use)
// @route   GET /api/users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Get all pending users
// @route   GET /api/users/pending
exports.getPendingUsers = async (req, res) => {
  try {
    const pendingUsers = await User.find({ status: 'Pending' })
                                   .select('-password')
                                   .sort({ dateJoined: 1 }); // Oldest first
    res.json(pendingUsers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Approve a user
// @route   PUT /api/users/approve/:id
exports.approveUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    user.status = 'Approved';
    await user.save();
    res.json({ msg: 'User approved', user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Reject a user (or just delete them)
// @route   PUT /api/users/reject/:id
exports.rejectUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    
    // Option 1: Set status to 'Rejected'
    user.status = 'Rejected';
    await user.save();
    res.json({ msg: 'User rejected', user });

    // Option 2: Delete the user entirely
    // await user.remove();
    // res.json({ msg: 'User rejected and deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};