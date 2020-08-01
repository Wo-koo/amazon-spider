const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create goods schema

const GoodsSchema = new Schema({
    GoodsName:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        require:false,
    },
    Tag:{
        type:String,
        required:true,
    },
    TagAppearanceCounts:{
        type:Number,
        require:true,
        default:0,
    }
})

module.exports = Goods = mongoose.model("Goods",GoodsSchema);