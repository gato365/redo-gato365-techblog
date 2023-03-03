const afterLoginRouter = require('express').Router();
const sequelize = require('../config/connection');
const {
    User,
    Post,
    Comment
} = require('../models');

// WithAuth middleware to prevent access to routes
const withAuth = require('../utils/auth');

// Display all posts on the home page (after login)
// @DESC    Get all posts
// @ROUTE   GET /afterLogin
// @ACCESS  Private
afterLoginRouter.get('/', withAuth, async (req, res) => {

    try {
        let posts = await Post.findAll({
            include: [
                {
                    model: User,
                    //  attributes: ['id', 'username'],
                },
                {
                    model: Comment,
                    include: [
                        {
                            model: User,
                            //  attributes: ['id', 'username'], 
                        },
                    ],
                },
            ]
        });


        // If there is an error, display the error
        if (!posts) {
            res.status(404).json({
                message: 'No posts found'
            });
        }


        // Serialize data so the template can read it
        posts = posts.map((post) =>
            post.get({
                plain: true
            })
        );


        // Display all posts on the home page (after login)
        res.status(200).render("afterLoginPage", {
            posts
        });




    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});



// Display a single post on the post page (after login)
// @DESC    Get a single post
// @ROUTE   GET /afterLogin/post/:id
// @ACCESS  Private
afterLoginRouter.get('/post/:id', withAuth, async (req, res) => {
    try {
        // Find the post by its id
        let post = await Post.findOne({
            where: {
                id: req.params.id
            },
            include: [
                {
                    model: User,
                    //  attributes: ['id', 'username'],
                },
                {
                    model: Comment,
                    include: [
                        {
                            model: User,
                            //  attributes: ['id', 'username'],
                        },
                    ],
                },
            ]
        });
        // Check if the post exists
        if (!post) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }
        // Serialize data so the template can read it
        post = post.get({
            plain: true
        });

        // Display a single post on the post page (after login)
        res.status(200).render("post", {
            post
        });

    } catch (err) {
        // If there is an error, display it
        res.status(500).json(err);
    }

});


// Edit a post
// @DESC    Edit a post
// @ROUTE   GET /afterLogin/edit/:id
// @ACCESS  Private
afterLoginRouter.get('/edit/:id',withAuth, async (req, res) => {
    try {
        // Find the post by its id
        let post = await Post.findOne({
            where: {    
                id: req.params.id
            },
            include: [
                {
                    model: User,
                    //  attributes: ['id', 'username'],
                },
                {
                    model: Comment,
                    include: [
                        {
                            model: User,
                            //  attributes: ['id', 'username'],
                        },
                    ],
                },
            ]
        });
        // Check if the post exists
        if (!post) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }
        // Serialize data so the template can read it
        post = post.get({
            plain: true
        });

        // Display a single post on the post page (after login)
        res.status(200).render("editPost", {
            post
        });

    } catch (err) {
        // If there is an error, display it
        res.status(500).json(err);
    }

});


// Might Delete this

router.get('/new', (req, res) => {
    res.render('add-post', {
        loggedIn: true
    })
})

// Export the router
module.exports = afterLoginRouter;
