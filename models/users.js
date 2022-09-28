/**
Schema user
how a user object look like
 */
const mon = require("mongoose");
const Schema = mon.Schema;

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});

const UserModel = mon.model("User", UserSchema);

module.exports = UserModel;
