const {model} =  require("mongoose");
const mongoose = require("mongoose");

const {userSchema}  = require("../schemas/Users");

const UsersModels = mongoose.model("User",userSchema);
module.exports = {UsersModels};