const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const User = require("./models/users");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const { consumers } = require("stream");
const app = express();
const { connect } = require("mongoose");
const { read } = require("fs");
const session = require("express-session");
const passport = require("passport");
require("./authentication/local.authentication");
const jwt = require("jsonwebtoken");
require("./authentication/jwt.authentication");

connect("mongodb+srv://Aloni:1234@cluster0.xfwelvs.mongodb.net/BLAGAN", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(
  () => {
    console.log("we are now connected to the db");
  },
  (err) => {
    console.log(`we failed to connect to the db: ${err.message}`);
  }
);

app.use(passport.initialize());

app.use(
  session({
    secret: "hello world",
  })
); // req.session

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.post(
  "/login",
  passport.authenticate("local", { session: false }),
  async function (req, res) {
    // req.user
    const token = await jwt.sign(
      {
        hello: "world",
        userId: req.user.email,
      },
      "secret string"
    );
    res.send("jwt token: " + token);
  }
);

app.use("/api", passport.authenticate("jwt", { session: false }));

app.get("/api/api", function (req, res) {
  res.send("users");
});

app.use("/", indexRouter);
app.use("/api/users", usersRouter);
// app.use('/api/logIn', logsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
