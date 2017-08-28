const express = require("express");
const User = require("../models/user");
const Snippet = require("../models/snippet");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require('passport');

mongoose.connect("mongodb://localhost:27017/codesnipDirectory");

const requireLogin = function (req, res, next) {
    console.log("Login check!");
    // console.log(req.user);
  if (req.user) {
    console.log(req.user)
    next()
  } else {
    res.redirect('/login');
  }
};

const login = function (req, res, next) {
  if (req.user) {
    res.redirect("/")
  } else {
    next();
  }
};

router.get("/", requireLogin,  function(req, res){
    // console.log("req.user", req.user);
    // User.find({}).sort("name")
    // .then(function (users) {
    //     data = users;
    //     // console.log(users);
        res.render("home")
    // });
});

router.get("/login", function(req, res){

    res.render('entry')
})

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

router.post('/signup',  function(req, res){
    console.log("THE BODY: ", req.body);
    User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        avatar:req.body.avatar,
        email: req.body.email,
     })

     .then(function(data) {
       console.log(data);
    //   let req.user==true;
       res.redirect("/");
     })
     .catch(function(err) {
       console.log("ERROR!:", err);
       res.redirect("/signup");
     });

})






//this is the id for the individual snip

//this is where it goes
router.post('/viewnewsnippet/:id', function(req, res) {
    let id = req.session.id;
    console.log("the new snippet id is:", id);
    let userId = req.user._id;
    console.log("the user's id works and is: ", userId);
    console.log("the 'type of' userID is ", typeof(userId));

    console.log("THE BODY: ", req.body);
    Snippet.create({
        title: req.body.title || null,
        description: req.body.description || null,
        language: req.body.language || null,
        code: req.body.code || null,
        tags:req.body.tags || null,
        userId: req.user._id || null
     })
     .then(function(data) {
       console.log("new code snippet data: ", data);
    //   let req.user==true;
       res.redirect("/viewnewsnippet/:id");
     })
     .catch(function(err) {
       console.log("ERROR!:", err);
       res.redirect("/");
     });
});

//this is what the page looks like
router.get('/viewnewsnippet/:id', function(req, res){
    let id = req.params.id;
    console.log(id);
    Snippet.find({_id: id})
            .then(function(snippet) {
                res.render('newSnip', {snippet: snippet})
            })
            .catch(function(err) {
                res.send(err);
            });
});

//this is where the user can view their snippets--> in their profile
router.get('/profile/:id', function(req, res) {

    let userId = req.user._id;
        User.find({"userId": userId}).sort("title")
        .then(function (data) {

            // data = users;
            // console.log(users);
            res.render("profile", {profile: data})
        })
        .catch(function(err){
            console.log(err);
            next(err);
        })
});



//view by tag //do a get for the tags with a tags
router.post('/search/:tags', function(req, res){

    let tagQuery = req.params;
    console.log(tagQuery);

    res.send('it works');

});


//view by language



router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});




module.exports = router;
