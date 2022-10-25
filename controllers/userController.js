const { User, Thought } = require('../models');

// Get all users
async function getUsers(req, res) {
  try {
    const users = await User.find().populate('thoughts').populate('friends');

    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

// Get a single user by userId
async function getSingleUser(req, res) {
  try {
    const user = await User.findOne({ _id: req.params.userId })
      .populate('thoughts')
      .populate('friends');
    if (!user) {
      return res.status(404).json({ message: 'No user with that ID' });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
}

// Create a new user
async function createUser(req, res) {
  try {
    const user = await User.create(req.body);
    return res.status(200).json({ message: 'Successfully created new user!' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
}

// Update a user
async function updateUser(req, res) {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { username: req.body.username, email: req.body.email },
      { runValidators: true, new: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'No user with that ID' });
    }
    return res.status(200).json({ message: 'Successfully updated user!' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
}

// Delete a user
async function deleteUser(req, res) {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'No user with that ID' });
    }
    return res.status(200).json({ message: 'Successfully deleted user!' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
};
