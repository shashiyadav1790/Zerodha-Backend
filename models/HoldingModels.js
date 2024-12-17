// const {model} = require("mongoose");

// const {HoldingsSchema} = require("../schemas/HoldingsSchema");

// const HoldingsModel = new model("Holding",HoldingsSchema);

// module.exports = {HoldingsModel}



// import { holdingSchema } from "../schema/HoldingSchema";
const { HoldingSchema } = require('../schemas/HoldingsSchema');
const mongoose = require('mongoose');
const holding = mongoose.model('holding',HoldingSchema);
module.exports = {holding};