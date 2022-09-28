const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/users");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    function (email, password, done) {
      User.findOne(
        {
          email: email,
          password: password,
        },
        function (err, user) {
          if (!user) {
            return done(null, false);
          } else {
            return done(null, user);
          }
        }
      );
    }
  )
);
