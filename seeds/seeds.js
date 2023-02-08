const sequelize = require('../config/connection');
const { Comment, Post, User } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');




// This is the seedDatabase function
const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    // Create the users
    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    // Create the posts
    for (const post of postData) {
        await Post.create({
            ...post,
            user_id: users[Math.floor(Math.random() * users.length)].id,
        });
    }

    // Create the comments
    for (const comment of commentData) {
        await Comment.create({
            ...comment,
            user_id: users[Math.floor(Math.random() * users.length)].id,
        });

    }

    process.exit(0);

};

seedDatabase();

