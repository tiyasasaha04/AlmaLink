const User = require('../models/User');

// This middleware must run *after* authMiddleware
module.exports = async function(req, res, next) {
  try {
    // req.user.id comes from authMiddleware
    const user = await User.findById(req.user.id); 

    if (user && user.isAdmin) {
      next();
    } else {
      res.status(403).json({ msg: 'Access denied: Not an admin' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};