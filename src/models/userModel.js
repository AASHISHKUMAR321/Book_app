const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
});

const userModel = model("users", userSchema);

module.exports = userModel;

//roles -> user , admin, librarain , guest
// user is logged in but is not an admin 
