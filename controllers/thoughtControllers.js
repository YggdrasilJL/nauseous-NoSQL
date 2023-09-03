const Thought = require('../models/Thought');
const User = require('../models/User');

const { thoughtText, username, userId } = req.body;
const thoughtId = req.params.id;

async function getAllThoughts(req, res) {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
}

async function getSingleThought(req, res) {
  try {
    const thought = await Thought.findById(thoughtId);
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
}

async function createThought(req, res) {
  try {
    const newThought = await Thought.create({ thoughtText, username, userId });
    await User.findByIdAndUpdate(
      userId,
      { $push: { thoughts: newThought._id } },
      { new: true }
    );
    res.status(201).json({ message: 'Thought created!', newThought });
  } catch (err) {
    res.status(500).json(err);
  }
}

async function updateThought(req, res) {
  try {
    const updatedThought = await Thought.findByIdAndUpdate(
      thoughtId,
      { thoughtText, username, userId },
      { new: true }
    );

    const message = updatedThought
      ? { message: 'thought updated', updatedThought }
      : { message: 'thought not found' };
    res.status(updatedThought ? 200 : 404).json(message);
  } catch (err) {
    res.status(500).json(err);
  }
}

async function deleteThought(req, res) {
  try {
    const deletedThought = await Thought.findByIdAndDelete(thoughtId);
    const message = deletedThought
      ? { message: 'thought deleted', deletedThought }
      : { message: 'thought not found' };

    res.status(deletedThought ? 200 : 404).json(message);
  } catch (err) {
    res.status(500).json(err);
  }
}

module.exports = {
  getAllThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
};
