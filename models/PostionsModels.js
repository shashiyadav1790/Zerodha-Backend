const {model} = require("mongoose");

const {PostionsSchema} = require("../schemas/PostionsSchema");

const PostionsModel = new model("Postion",PostionsSchema);

module.exports = {PostionsModel}