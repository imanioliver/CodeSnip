
// });
//
// router.post('/newSnippet', function (req, res){
//
//     let tagSplit= req.body.tags.split(", ");
//
//     Snippet.create({
//         title: req.body.title || null,
//         description: req.body.description || null,
//         language: req.body.language || null,
//         code: req.body.code || null,
//         tags: tagSplit || null,
//         userId: req.user._id || null,
//         username: req.user.username || null
//      })
//      .then(function(data) {
//        console.log("new code snippet data: ", data);
//     //   let req.user==true;
//      })
//      .catch(function(err) {
//        console.log("ERROR!:", err);
//
//      });
//      res.redirect("/viewAll"); //to home
// });
//



///THE BELOW WAS REPLACED WITH THE GET CALL FOR '/'
// router.get("/viewAll", requireLogin,  function(req, res){ //put in get for home
//     console.log("req.user", req.user);
//     Snippet.find({}).sort("name")
//     .then(function (snippets) {
//         data = snippets;
//         // console.log(users);
//         res.render("home", {allSnippets: data}) //put in render for home '/'
//     });
// });




//this is what the page looks like
// router.get('/viewnewsnippet/:id', function(req, res){
//     let id = req.params.id;
//     console.log(id);
//     Snippet.find({_id: id})
//             .then(function(snippet) {
//                 res.render('newSnip', {snippet: snippet})
//             })
//             .catch(function(err) {
//                 res.send(err);
//             });
// });



// router.get("/", requireLogin,  function(req, res){
//     // console.log("req.user", req.user);
//     // User.find({}).sort("name")
//     // .then(function (users) {
//     //     data = users;
//     //     // console.log(users);
//         res.render("home")
//     // });
// });
//
