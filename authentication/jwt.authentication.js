const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const extractToken =
  require("passport-jwt").ExtractJwt.fromAuthHeaderAsBearerToken;
const User = require("../models/users");

passport.use(
  new JwtStrategy(
    {
      secretOrKey: "secret string",
      jwtFromRequest: extractToken(),
    },
    function (payload, done) {
      User.findOne(
        {
          email: payload.userId,
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
