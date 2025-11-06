const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
require('dotenv').config();

// --- Register User ---
exports.registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullName, email, enrollmentNumber, password } = req.body;

  try {
    // 1. Check if user already exists (by email or enrollment)
    let user = await User.findOne({ $or: [{ email }, { enrollmentNumber }] });
    if (user) {
      return res.status(400).json({ msg: 'User with this email or enrollment number already exists' });
    }

    // 2. Create new user instance
    user = new User({
      fullName,
      email,
      enrollmentNumber,
      password,
      // Status defaults to 'Pending' as per our User.js model
    });

    // 3. Password hashing is handled by the 'pre-save' hook in User.js

    // 4. Save user to DB
    await user.save();

    // 5. Respond with success (NO token yet, user must be approved)
    res.status(201).json({ 
      msg: 'Registration successful! Your account is pending admin approval.' 
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// --- Login User ---
exports.loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // 1. Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // 2. Check if user is Approved
    if (user.status !== 'Approved') {
      if (user.status === 'Pending') {
        return res.status(401).json({ msg: 'Your account is still pending approval.' });
      }
      if (user.status === 'Rejected') {
        return res.status(401).json({ msg: 'Your account has been rejected.' });
      }
      return res.status(401).json({ msg: 'Account not active. Please contact admin.' });
    }

    // 3. Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // 4. Create and return JWT token
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '5d' }, // Token expires in 5 days
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};