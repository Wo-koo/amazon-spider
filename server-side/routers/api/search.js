const express = require("express");
const router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");
const Goods = require("../../module/goods");

router.get("/client/search/:searchText",(req,res)=>{
    console.log("client/search's req = " + req.params.searchText);
    axios.get(`https://www.amazon.cn/s?k=${req.params.searchText}`).then(function(res){
        var $ = cheerio.load(res.data);
        $('.s-result-item',".sg-col-inner").map(function(index,ele){
            var tags = $("h2 span",this).text();
            var price = $(".a-price",this).text();

            tags.split(' ').forEach(function(value,index,source){
                Goods.findOne({GoodsName:req.params.searchText,Tag:value}).then(goods=>{
                    if (goods) {
                        Goods.updateOne({_id:goods._id},{$set:{TagAppearanceCounts:goods.TagAppearanceCounts + 1}},(err,res)=>{
                            console.log(`find one already exist ${goods.GoodsName} ${goods.Tag} goodsCount = ${goods.TagAppearanceCounts}`);
                            if (err) {
                                console.error(err);
                            }
                        });
                    }else {
                        if (value) {
                            var newGoodsTag = new Goods({
                                GoodsName:req.params.searchText,
                                price:price,
                                Tag:value,
                                TagAppearanceCounts:1
                            });
                            newGoodsTag.save().then(()=>{})
                            .catch(err=>console.error(err));
                        }                   
                    }
                });
            });
         });

        // next page if href is not undefined
        var nextPageUrl = $(".a-selected",".a-pagination").next('.a-normal').children('a').attr("href");
        console.log(`nextPageUrl = ${nextPageUrl}`);
    }).catch(function(error){
        console.log(error)
    }).finally(function(){
        // always do
    })
    return res.status(200).json({msg:"查询成功"});
});

router.get("/client/searchResult",(req,res)=>{
    // to do
})
module.exports = router;