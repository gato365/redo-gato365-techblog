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
 
    

     posts = posts.map((post) => post.get({ plain: true }));
     
    //  res.status(200).json(posts);



     res.render("beforeLoginPage", {
        posts
     });
 
 });




module.exports = beforeLoginRouter;


