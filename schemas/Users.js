// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const passportLocalMongoose = require("passport-local-mongoose");

// const userScehma = new Schema({
//     username: {
//         type: String,
//         require: true,
//     },
//     email: {
//         type: String,
//         require: true,
//     },
//     password: {
//         type: String,
//         require: true,
//     }
// })

// userScehma.plugin(passportLocalMongoose);

// const User = mongoose.model("User",userScehma);

// module.exports =User;


const {Schema} = require('mongoose');
const bcrypt = require("bcryptjs");
const UserSchema = new Schema(
    {
        email: {
            type: String,
            required: [true, "Your email address is required"],
            unique: true,
          },
          username: {
            type: String,
            required: [true, "Your username is required"],
          },
          password: {
            type: String,
            required: [true, "Your password is required"],
          },
          createdAt: {
            type: Date,
            default: new Date(),
          },
    }
);
UserSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 12);
  });
  
module.exports = {UserSchema};