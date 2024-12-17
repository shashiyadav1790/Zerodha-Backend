// const {model} = require("mongoose");

// const {PostionsSchema} = require("../schemas/PostionsSchema");

// const PostionsModel = new model("Postion",PostionsSchema);

// module.exports = {PostionsModel}


// import { holdingSchema } from "../schema/HoldingSchema";
const {PositionSchema} = require('../schemas/PostionsSchema')
const mongoose = require('mongoose');
const position = mongoose.model('position',PositionSchema);
module.exports = {position};


