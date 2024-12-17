// const {model} = require("mongoose");
// const {OrderScehma} = require("../schemas/OrdersScehma");

// const OrderModel = new model("Orde",OrderScehma);
// module.exports = {OrderModel};




const {model} = require("mongoose");
const mongoose = require('mongoose');
const {OrderSchema} = require('../schemas/OrdersScehma');
const OrderModel =mongoose.model("order",OrderSchema);
module.exports = {OrderModel};