const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const router = express.Router();

// Secret for JWT (replace with environment variable in production)
const JWT_SECRET = 'your_secret_key';

// Create User (Registration)
router.post('/', async (req, res) => {
  const { email, username, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ email, username, password: hashedPassword, role });
  try {
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(400).json({ message: 'Invalid email or password' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(400).json({ message: 'Invalid email or password' });
      }

      const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
      res.json({ token, user });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

// GET /api/users
router.get('/', async (req, res) => {
  try {
    const users = await User.find(); // Assuming you're using MongoDB/Mongoose
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update User
router.put('/:id', async (req, res) => {
  const { email, username, password, role } = req.body;
  const userUpdates = { email, username, role };

  if (password) {
    userUpdates.password = await bcrypt.hash(password, 10);
  }

  try {
    const user = await User.findByIdAndUpdate(req.params.id, userUpdates, { new: true });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete User
router.delete('/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;