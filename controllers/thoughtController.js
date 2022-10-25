const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

// Get all thoughts
async function getThoughts(req, res) {
  try {
    const thoughts = await Thought.find();
    return res.status(200).json(thoughts);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
}

// Create a thought
async function createThought(req, res) {
  try {
    const thought = await Thought.create(req.body);
    await User.findOneAndUpdate(
      { username: req.body.username },
      { $addToSet: { thoughts: ObjectId(thought._id) } },
      { runValidators: true, new: true }
    );
    return res
      .status(200)
      .json({ message: 'Successfully created new thought!' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

// Get thought by ID
async function getSingleThought(req, res) {
  try {
    const thought = await Thought.findOne({ _id: req.params.thoughtId });
    if (!thought) {
      return res.status(404).json({ message: 'No thought with that ID' });
    }
    return res.status(200).json(thought);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
}

// Update thought by ID
async function updateThought(req, res) {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $set: req.body },
      { runValidators: true, new: true }
    );
    if (!thought) {
      return res.status(404).json({ message: 'No thought with that ID' });
    }
    return res.status(200).json({ message: 'Successfully updated thought!' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  getThoughts,
  createThought,
  getSingleThought,
  updateThought,
  //   deleteThought,
};
