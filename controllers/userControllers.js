const { User, Thought } = require('../models/index');

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
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username is already taken.' });
    }
    const newUser = await User.create(req.body);
    res.status(200).json({ message: 'User created!', user: newUser });
  } catch (err) {
    res.status(500).json(err);
  }
}

async function updateUser(req, res) {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ message: 'User updated!', user: updatedUser });
  } catch (err) {
    res.status(500).json(err);
  }
}

async function deleteUser(req, res) {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    await Thought.deleteMany({ _id: { $in: deletedUser.thoughts } });
    res.status(200).json({ message: 'User deleted!', user: deletedUser });
  } catch (err) {
    res.status(500).json(err);
  }
}

async function addFriend(req, res) {
  try {
    const { userId, friendId } = req.params;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { friends: friendId } },
      { new: true }
    );

    const updatedFriend = await User.findByIdAndUpdate(
      friendId,
      { $addToSet: { friends: userId } },
      { new: true }
    );

    if (!updatedUser || !updatedFriend) {
      return res.status(404).json({ message: 'User or friend not found!' });
    }
    res.status(200).json({ message: 'Friend added!', user: updatedUser });
  } catch (err) {
    res.status(500).json(err);
  }
}

async function removeFriend(req, res) {
  try {
    const { userId, friendId } = req.params;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { friends: friendId } },
      { new: true }
    );

    const updatedFriend = await User.findByIdAndUpdate(
      friendId,
      { $pull: { friends: userId } },
      { new: true }
    );

    if (!updatedUser || !updatedFriend) {
      return res.status(404).json({ message: 'User or friend not found!' });
    }
    res.status(200).json({ message: 'Friend removed!', user: updatedUser });
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
  addFriend,
  removeFriend,
};