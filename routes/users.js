var express = require("express");
var router = express.Router();
const User = require("../models/users");

/* GET users listing.  /api/users */
router.get("/", function (req, res) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.cookie("hello", "world");
  // req.headers['Cookie']
  // {hello: 'world'}
  // req.cookie
  User.find()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
  req.session["hello"] = "hello session";
});

// router.get('/foo', function (req, res) {
// 	// req.headers['Cookie']
// 	// {hello: 'world'}
// 	// req.cookie
// 	res.send(`bar ${req.cookies.hello} ${req.session.hello}` );
// })

router
  .route("/:id")
  .all(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    const id = req.params.id;
    req.id = id;
    next();
  })
  .get(function (req, res) {
    User.findById(req.id)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        console.log(err);
      });
  })
  .delete(function (req, res) {
    User.findByIdAndDelete(req.id)
      .then((result) => {
        res.status(204).end();
      })
      .catch((err) => {
        console.log(err);
      });
  });

router.post("/", function (req, res) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  const user = new User(req.body);
  user
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
