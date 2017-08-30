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

router.get("/", requireLogin,  function(req, res){ //put in get for home
    console.log("req.user", req.user);
    Snippet.find({}).sort("name")
    .then(function (snippets) {
        // console.log(users);
        res.render("home", {allSnippets: snippets}) //put in render for home '/'
    });
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

router.get('/create', requireLogin, function (req, res) {
    res.render('create');
});

// this is the id for the individual snip

//this is where it goes
// router.post('/create/:id', function(req, res) {

router.post('/create', function(req, res) {
    let tagSplit= req.body.tags.split(",");

    // let id = req.params.id;
    // console.log("the new snippet id is:", id);
    let userId = req.user._id;
    let username = req.user.username;
    console.log("the user's id works and is: ", userId);
    console.log("the 'type of' userID is ", typeof(userId));

    console.log("THE BODY: ", req.body);

    let brandNew = {
        title: req.body.title || null,
        description: req.body.description || null,
        language: req.body.language || null,
        code: req.body.code || null,
        tags: tagSplit,
        userId: req.user._id,
        username: req.user.username
    };

    console.log(brandNew);

    Snippet.create(brandNew)
     .then(function(data) {
       console.log("new code snippet data: ", data);
    //   let req.user==true;
    res.redirect("/view/" + data._id);
     })
     .catch(function(err) {
       console.log("ERROR!:", err);
       res.redirect("/create");
     });
});

let temp;
// Variable to store id when req.params.id === 'main.css'

router.get('/view/:id', function (req, res){
    let id = req.params.id;
    if (temp !== null) {
        id = temp;
    }
    console.log(id);
    Snippet.find({_id: id})
            .then(function(snippet) {
                snippet.forEach(function(snip) {
                    if (snip.username === req.user.username){
                        snip.canEdit === true;
                    }
                })
                console.log(req.user);
                console.log(snippet);
                temp = id;
                res.render('oneSnip', {snippet: snippet})
            })
            .catch(function(err) {
                res.send(err);
            });
});

router.get ('/edit', function (req, res){
    res.render('edit');
});

router.post('/edit/:id', function(req, res) {
    let tagSplit= req.body.tags.split(", ");
    let id = req.params.id;

    Snippet.update({_id:id}, {
        title: req.body.title || null,
        description: req.body.description || null,
        language: req.body.language || null,
        code: req.body.code || null,
        tags: tagSplit,
        userId: req.user._id,
        username: req.user.username
    }).then(function(data) {
        res.redirect('/view/:id');
    })
});

router.get('/search/tags/:puppy', function(req, res){
    let cat = req.params.puppy;
    // if (cat === 'main.css') {
    //     cat = temp;
    //     temp = null;
    // }
    Snippet.find({tags: cat})
     .then(function(snippet) {
       console.log("new code snippet data: ", snippet);
    //    temp = snippet;
    //   let req.user==true;
        res.render("tagsorlanguage", {allSnippets: snippet});
     })
     .catch(function(err) {
       console.log("ERROR!:", err);
       res.redirect("/create");
     });
});

router.get('/search/language/:eggs', function(req, res){
    let bacon = req.params.eggs;
    if (bacon === 'main.css') {
        bacon = temp;
        temp = null;
    }
    Snippet.find({language: bacon})
     .then(function(snippet) {
       console.log("new code snippet data: ", snippet);
       temp = snippet;
    //   let req.user==true;
    res.render("tagsorlanguage", {allSnippets:snippet});
     })
     .catch(function(err) {
       console.log("ERROR!:", err);
       res.redirect("/create");
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
