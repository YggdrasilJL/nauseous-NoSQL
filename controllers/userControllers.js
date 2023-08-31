const User = require('../models/User');

const data = req.body;
const userId = req.params.id;

async function getSingleUser(req, res) {
  try {
    const user = await User.findById(userId);
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
}

async function createUser(req, res) {
  try {
    const newUser = await User.create(data);
    res.json(newUser);
  } catch (err) {
    res.status(500).json(err);
  }
}

async function updateUser(req, res) {
  try {
    const updatedUser = User.findByIdAndUpdate(userId, data, { new: true });
  } catch (err) {
    res.status(500).json(err);
  }
}

async function deleteUser(req, res) {
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    res.status(200).json({ message: 'User deleted!', deletedUser });
  } catch {
    res.status(500).json(err);
  }
}
