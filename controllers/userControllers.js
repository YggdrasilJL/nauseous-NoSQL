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
    const existingUser = User.findOne({ username: req.body.username });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: 'Username is already taken.', existingUser });
    } else {
      const newUser = await User.create(req.body);
      res.status(200).json({ message: 'User created!', newUser });
    }
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

async function addFriend(req, res) {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    );

    const updatedUser2 = await User.findByIdAndUpdate(
      req.params.friendId,
      { $addToSet: { friends: req.params.userId } },
      { new: true }
    );

    if (!updatedUser || !updatedUser2) {
      return res.status(404).json({ message: 'User or friend not found!' });
    }
    res.status(200).json({ message: 'Friend added!', updatedUser });
  } catch (err) {
    res.status(500).json(err);
  }
}

async function removeFriend(req, res) {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      { $pull: { friends: req.params.friendId } },
      { new: true }
    );

    const updatedUser2 = await User.findByIdAndUpdate(
      req.params.friendId,
      { $pull: { friends: req.params.userId } },
      { new: true }
    );

    if (!updatedUser || !updatedUser2) {
      return res.status(404).json({ message: 'User or friend not found!' });
    }
    res.status(200).json({ message: 'Friend removed!', updatedUser });
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
