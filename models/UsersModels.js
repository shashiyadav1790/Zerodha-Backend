// const {model} =  require("mongoose");
// const mongoose = require("mongoose");

// const {userSchema}  = require("../schemas/Users");

// const UsersModels = mongoose.model("User",userSchema);
// module.exports = {UsersModels};


const {UserSchema} = require('../schemas/Users');
const mongoose = require('mongoose');
const User = mongoose.model('User',UserSchema);
module.exports = {User};