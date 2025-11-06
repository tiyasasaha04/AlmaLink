const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

module.exports = async function(req, res, next) {
  // Get token from header
  const token = req.header('Authorization')?.split(' ')[1];

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Add user from payload (just the id)
    req.user = decoded.user;

    // We can also attach the full user object if we query the DB
    // const user = await User.findById(decoded.user.id).select('-password');
    // if (!user) {
    //   return res.status(401).json({ msg: 'User not found' });
    // }
    // req.user = user; // Now req.user is the full user object
    
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};