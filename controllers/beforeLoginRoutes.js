const { Router } = require("express");
const { User, Post, Comment } = require('../models');

const beforeLoginRouter = new Router();



// Display all posts on the home page (before login)
// @DESC    Get all posts
// @ROUTE   GET /beforeLogin
// @ACCESS  Public
beforeLoginRouter.get('/', async (req, res) => {
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

    // Serialize data so the template can read it
    posts = posts.map((post) =>
        post.get({
            plain: true
        }));


    // Display all posts on the home page (before login)
    res.status(200).render("beforeLoginPage", {
        posts
    });
});

// Display a single post on the post page (before login)
// @DESC    Get a single post
// @ROUTE   GET /beforeLogin/post/:id
// @ACCESS  Public
beforeLoginRouter.get('/post/:id', async (req, res) => {

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
        // Display a single post on the post page (before login)
        res.status(200).render("post", {
            post
        });
    } catch (err) {
        // If there is an error, display it
        res.status(500).json(err);
    }
});

// Login page
// @DESC    Get the login page
// @ROUTE   GET /beforeLogin/login
// @ACCESS  Public
beforeLoginRouter.get('/login', async (req, res) => {
    // If the user is already logged in, redirect to the home page
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    // Display the login page
    res.render('login');
});

// Sign up page
// @DESC    Get the sign up page
// @ROUTE   GET /beforeLogin/signup
// @ACCESS  Public
beforeLoginRouter.get('/signup', async (req, res) => {
    // If the user is already logged in, redirect to the home page
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});

// Any other route will be redirected to the home page
// @DESC    Redirect to the home page
// @ROUTE   GET /*
// @ACCESS  Public
beforeLoginRouter.get('*', async (req, res) => {
    res.redirect('/');
});

module.exports = beforeLoginRouter;


