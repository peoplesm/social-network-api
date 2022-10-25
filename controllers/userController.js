const { ObjectId } = require('mongoose').Types;
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
      { $set: req.body },
      { runValidators: true, new: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'No user with that ID' });
    }
    //Updates the thoughts to the user's new name if updated
    await Thought.updateMany(
      { _id: { $in: user.thoughts } },
      {
        username: req.body.username,
      }
    );
    return res.status(200).json({ message: 'Successfully updated user!' });
  } catch (error) {
    console.log(error);
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
    await Thought.deleteMany({ _id: { $in: user.thoughts } });
    return res.status(200).json({ message: 'Successfully deleted user!' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
}

// Add a friend
async function addFriend(req, res) {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $addToSet: { friends: ObjectId(req.params.friendId) } },
      { runValidators: true, new: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'No user with that ID' });
    }
    return res.status(200).json({ message: 'Successfully added friend!' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
}

// Delete a friend
async function deleteFriend(req, res) {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, {
      $pull: { friends: ObjectId(req.params.friendId) },
    });
    if (!user) {
      return res.status(404).json({ message: 'No user with that ID' });
    }
    return res.status(200).json({ message: 'Successfully deleted friend!' });
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
  addFriend,
  deleteFriend,
};
