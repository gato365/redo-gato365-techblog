const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// @DESC GET all posts
// @ROUTE GET /api/posts
// @ACCESS Public
router.get('/', (req, res) => {
    try {
        // Access our Post model and run .findAll() method)
        let posts = Post.findAll()

        // If there is no post, return an error
        if (!posts) {
            res.status(404).json({ message: 'No posts found' });
            return;
        }


        // If there is a post, return it
        res.status(200).json(posts);


    } catch (err) {
        res.status(500).json(err);
    }

});


// @DESC GET a single post
// @ROUTE GET /api/posts/:id
// @ACCESS Public
router.get('/:id', (req, res) => {
    try {

        // Access our Post model and run .findOne() method)
        let posts = Post.findOne({
            where: {
                id: req.params.id
            }
        })

        // If there is no post, return an error
        if (!posts) {
            res.status(404).json({ message: 'No posts found' });
            return;
        }

        // If there is a post, return it
        res.status(200).json(posts);



    } catch (err) {
        res.status(500).json(err);
    }

});

// @DESC Post a new post
// @ROUTE POST /api/posts
// @ACCESS Private
router.post('/', withAuth, (req, res) => {

    try {
        let posts = Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id
        });
        res.status(200).json(posts);
    }
    catch (err) {
        res.status(500).json(err);
    }

});

// @DESC Update a post
// @ROUTE PUT /api/posts/:id
// @ACCESS Private
router.put('/:id', withAuth, (req, res) => {
    try {
        let posts = Post.update(
            {
                where: {
                    id: req.params.id
                }
            },
            {
                title: req.body.title,
                content: req.body.content,
                user_id: req.session.user_id
            });
        // If there is no post, return an error
        if (!posts) {
            res.status(404).json({ message: 'No posts found' });
            return;
        }
        // If there is a post, return it
        res.status(200).json(posts);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

// @DESC Delete a post
// @ROUTE DELETE /api/posts/:id
// @ACCESS Private
router.delete('/:id', withAuth, (req, res) => {
    try {
        let posts = Post.destroy({
            where: {
                id: req.params.id
            }
        });
        // If there is no post, return an error
        if (!posts) {
            res.status(404).json({ message: 'No posts found' });
            return;
        }
        // If there is a post, return it
        res.status(200).json(posts);
    }
    catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;