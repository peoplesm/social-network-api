const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomUserName, getRandomThoughts } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  await Thought.deleteMany({});
  await User.deleteMany({});

  const users = [];

  for (let i = 0; i < 20; i++) {
    const username = getRandomUserName();
    const first = username.split(' ')[0];
    const last = username.split(' ')[1];
    const email = `${first}@${last}.com`;

    users.push({
      username,
      email,
    });
  }

  await User.collection.insertMany(users);

  //Add thoughts to user
  for (const user of users) {
    const randomThought = getRandomThoughts(5);
    const thought = await Thought.create({
      thoughtText: randomThought,
      username: user.username,
    });

    try {
      const userUp = await User.findOneAndUpdate(
        { username: user.username },
        { $addToSet: { thoughts: thought._id } },
        { runValidators: true, new: true }
      );
      console.log(userUp);
    } catch (error) {
      console.log(error);
    }
  }

  // log out the seeded data
  console.table(users);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
