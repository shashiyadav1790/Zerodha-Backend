const {Schema} = require("mongoose");

const OrderScehma = new Schema({
    name: String,
    qty: Number,
    price: Number,
    mod: String,
})

module.exports = {OrderScehma};