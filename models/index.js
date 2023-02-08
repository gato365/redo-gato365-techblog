const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');


// Create associations
// User can have many posts
User.hasMany(Post, {   // User can have many posts
    foreignKey: 'user_id'
});

// Post belongs to a user
Post.belongsTo(User, {
    // Post belongs to a user   
    // This is the reverse of the above
    foreignKey: 'user_id',
});


// Post can have many comments
Post.hasMany(Comment, {
    foreignKey: 'post_id'
});

// Comment belongs to a post
Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});

// Comment belongs to a user
Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

// User can have many comments
User.hasMany(Comment, {
    foreignKey: 'user_id'
});



module.exports = { User, Post, Comment };