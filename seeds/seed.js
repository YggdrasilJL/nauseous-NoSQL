const { default: mongoose } = require('mongoose');
const Thought = require('../models/Thought');
const User = require('../models/User');
async function seedDatabase() {
  try {
    // Connect to the database
    await mongoose.connect('mongodb://127.0.0.1:27017/social_network', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Clear existing data
    await User.deleteMany();
    await Thought.deleteMany();

    // Create 4 users
    const user1 = await User.create({
      username: 'user1',
      email: 'user1@example.com',
    });

    const user2 = await User.create({
      username: 'user2',
      email: 'user2@example.com',
    });

    const user3 = await User.create({
      username: 'user3',
      email: 'user3@example.com',
    });

    const user4 = await User.create({
      username: 'user4',
      email: 'user4@example.com',
    });

    // Create one thought for each user
    const thought1 = await Thought.create({
      thoughtText: 'Thought by user 1',
      username: user1.username,
    });

    const thought2 = await Thought.create({
      thoughtText: 'Thought by user 2',
      username: user2.username,
    });

    const thought3 = await Thought.create({
      thoughtText: 'Thought by user 3',
      username: user3.username,
    });

    const thought4 = await Thought.create({
      thoughtText: 'Thought by user 4',
      username: user4.username,
    });

    // Link thought IDs to user thoughts arrays
    user1.thoughts.push(thought1._id);
    user2.thoughts.push(thought2._id);
    user3.thoughts.push(thought3._id);
    user4.thoughts.push(thought4._id);

    // Save the updated users
    await Promise.all([user1.save(), user2.save(), user3.save(), user4.save()]);

    console.log('Database seeded successfully');

    // Disconnect from the database
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

seedDatabase();
