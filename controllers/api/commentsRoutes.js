const router = require('express').Router();
const { Comment } = require('../../models');

// GET all comments
router.get('/', (req, res) => {
    try {
        // Access our Comment model and run .findAll() method)
        let comments = Comment.findAll()

        // If there is no comment, return an error
        if (!comments) {
            res.status(404).json({ message: 'No comments found' });
            return;
        }

        // If there is a comment, return it
        res.status(200).json(comments);

        
    } catch (err) {
        res.status(500).json(err);
    }
});


// Post a comment
router.post('/', (req, res) => {
    try {
        // Access our Comment model and run .create() method)
        let comments = Comment.create({
            comment_text: req.body.comment_text,
            user_id: req.body.user_id,
            post_id: req.body.post_id
        })

        // If there is no comment, return an error
        if (!comments) {
            res.status(404).json({ message: 'No comments found' });
            return;
        }

        // If there is a comment, return it
        res.status(200).json(comments);


    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router;