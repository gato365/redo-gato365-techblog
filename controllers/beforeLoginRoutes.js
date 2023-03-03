const { Router } = require("express");
const { User, Post, Comment } = require('../models');

const beforeLoginRouter = new Router();



// Display all posts on the home page (before login)
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
beforeLoginRouter.get('/login', async (req, res) => {
    res.render('login', { title: "HERE IS THE LOGIN PAGE" },);
});

// Sign up page
beforeLoginRouter.get('/signup', async (req, res) => {
    res.render('signup');
});

// Any other route will be redirected to the home page
beforeLoginRouter.get('*', async (req, res) => {
    res.redirect('/');
});


module.exports = beforeLoginRouter;


