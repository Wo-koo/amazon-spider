const express = require("express");
const router = express.Router();
const Goods = require("../../module/goods");

router.get('/client/history/:searchText',async (req,res)=>{
    if (req.body.GoodsName) {
        let goods = await Goods.find({GoodsName:req.params.GoodsName}).limit(100);
        res.json(goods);}
    else{
        let goods = await Goods.find().limit(100);
        res.json(goods);}
    
});

module.exports = router;