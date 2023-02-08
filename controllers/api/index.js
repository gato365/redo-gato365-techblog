const router = require('express').Router();
const userRoutes = require('./usersRoutes');
const commentRoutes = require('./commentsRoutes');
const postRoutes = require('./postsRoutes');

router.use('/users', userRoutes);
router.use('/comments', commentRoutes);
router.use('/posts', postRoutes);

module.exports = router;
