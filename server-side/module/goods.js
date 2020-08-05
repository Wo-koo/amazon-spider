const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create goods schema

const GoodsSchema = new Schema({
    GoodsName:{
        type:String,
        required:true,
    },
    price:{
        type:String,
        require:false,
    },
    Tag:{
        type:String,
        required:true,
        
    },
    Counts:{
        type:Number,
        require:false,
        default:0,
    }
})

module.exports = Goods = mongoose.model("Goods",GoodsSchema);