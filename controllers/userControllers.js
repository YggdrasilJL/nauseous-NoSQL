const User = require('../models/User');
const Thought = require('../models/Thought');

async function getAllUsers(req, res) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
}

async function getSingleUser(req, res) {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
}

async function createUser(req, res) {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser);
    res.status(200).json({ message: 'User created!', newUser });
  } catch (err) {
    res.status(500).json(err);
  }
}

async function updateUser(req, res) {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ message: 'User updated!', updatedUser });
  } catch (err) {
    res.status(500).json(err);
  }
}
// delete user and their thoughts
async function deleteUser(req, res) {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    await Thought.deleteMany(deletedUser.thoughts);
    res.status(200).json({ message: 'User deleted!', deletedUser });
  } catch (err) {
    res.status(500).json(err);
  }
}

module.exports = {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
};
