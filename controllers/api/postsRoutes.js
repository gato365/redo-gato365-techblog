const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// GET all posts
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


// GET a single post
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

// Create a new post
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

// Update a post
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

// Delete a post
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