var express = require("express");
var router = express.Router();
const User = require("../models/users");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  User.find({ email: "alon@kigler" }, (error, data) => {
    if (error) {
      console.log(error);
    } else {
      res.send(data);
    }
  });
});

module.exports = router;
