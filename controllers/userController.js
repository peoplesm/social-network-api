const User = require('../models/User');

// Get all users
async function getUsers(req, res) {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Get a single user by userId
async function getSingleUser(req, res) {
  try {
    const user = await User.findOne({ _id: req.params.userId })
      .populate('thoughts')
      .populate('friends');
    if (!user) {
      res.status(404).json({ message: 'No user with that ID' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Create a new user
async function createUser(req, res) {
  try {
    const user = await User.create(req.body);
    res.status(200).json({ message: 'Successfully created new user!' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = { getUsers, getSingleUser, createUser };
