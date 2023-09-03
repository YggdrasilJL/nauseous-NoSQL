const Thought = require('../models/Thoughts');

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
      {
        new: true,
      }
    );
    res.status(200).json({ message: 'Thought updated!', updatedThought });
    if (!updatedThought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
}

async function deleteThought(req, res) {
  try {
    const deletedThought = await Thought.findByIdAndDelete(thoughtId);
    res.status(200).json({ message: 'Thought deleted!', deletedThought });
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
