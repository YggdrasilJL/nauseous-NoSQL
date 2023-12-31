const { User, Thought } = require('../models/index');

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
    const thought = await Thought.findById(req.params.id);
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
}

async function createThought(req, res) {
  try {
    const { thoughtText, username, userId } = req.body;

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
    const { thoughtText, username, userId } = req.body;

    const updatedThought = await Thought.findByIdAndUpdate(
      req.params.id,
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
    const deletedThought = await Thought.findByIdAndDelete(req.params.id);
    const message = deletedThought
      ? { message: 'thought deleted', deletedThought }
      : { message: 'thought not found' };

    res.status(deletedThought ? 200 : 404).json(message);
  } catch (err) {
    res.status(500).json(err);
  }
}

// reactions

async function createReaction(req, res) {
  try {
    const thoughtData = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { reactions: req.body } },
      { new: true }
    );

    !thoughtData
      ? res.status(404).json({ message: 'No thought found with that ID!' })
      : res.json(thoughtData);
  } catch (err) {
    res.json(500).json(err);
  }
}

async function deleteReaction(req, res) {
  try {
    const thoughtData = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $pull: { reactions: { _id: req.params.reactionId } } },
      { new: true }
    );

    if (!thoughtData) {
      return res
        .status(404)
        .json({ message: 'No thought found with that ID!' });
    }

    res.json(thoughtData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  getAllThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
};
