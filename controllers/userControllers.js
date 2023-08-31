const User = require('../models/User');

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
  } catch (err) {
    res.status(500).json(err);
  }
}

async function updateUser(req, res) {
  try {
    const updatedUser = User.updateOne();
  } catch (err) {
    res.status(500).json(err);
  }
}
