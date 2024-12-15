const {model} = require("mongoose");
const {OrderScehma} = require("../schemas/OrdersScehma");

const OrderModel = new model("Orde",OrderScehma);
module.exports = {OrderModel};
