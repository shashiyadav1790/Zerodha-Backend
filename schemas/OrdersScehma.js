// const {Schema} = require("mongoose");

// const OrderScehma = new Schema({
//     name: String,
//     qty: Number,
//     price: Number,
//     mod: String,
// })

// module.exports = {OrderScehma};

const {Schema} = require('mongoose');
const mongoose = require('mongoose');
const OrderSchema =  new mongoose.Schema(
    {
        name:String,
        qty:Number,
        price:Number,
        mode:String,
        curr:Number
    }
)
module.exports = {OrderSchema};