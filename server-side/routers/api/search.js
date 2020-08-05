const express = require("express");
const router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");
const Goods = require("../../module/goods");

router.get("/client/search/:searchText",(req,res)=>{
    console.log("client/search's req = " + req.params.searchText);
    var docMap = new Map();
    function AxiosSpider(url){
        axios.get(`https://www.amazon.co.jp/${url}`).then(function(res){
            var $ = cheerio.load(res.data);
            $('.s-result-item',".sg-col-inner").map(function(index,ele){
                var tags = $("h2 span",this).text();
                var price = $(".a-price",this).text();
                console.log("tags = " + tags);
                tags.split(' ').forEach(function(value,index,source){
                    if(value){
                        if(docMap.has(value)){
                            let doc = docMap.get(value);
                            doc.Counts = doc.Counts + 1;
                            docMap.set(value,doc);
                        }else{
                            docMap.set(value,{Counts:1})
                        }
                    }
                });
             });    
            // next page if href is not undefined
            var nextPageUrl = $(".a-selected",".a-pagination").next('.a-normal').children('a').attr("href");
            var pageNum = $(".a-selected",".a-pagination").next('.a-normal').children('a').text();
            console.log(`nextPageUrl = ${nextPageUrl}`);
            console.log("pageNum = "+ pageNum);
            if(pageNum < 3){
                AxiosSpider(nextPageUrl);
            }
            else{
                console.log(docMap)
                for(const [key,value] of docMap){
                    var temp = new Goods({
                        GoodsName:req.params.searchText,
                        Counts:value.Counts,
                        Tag:key,
                    });
                    temp.save();
                }
                return;
            }
        }).catch(function(error){
            console.log(error)
        }).finally(function(){
            // always do
        })
    }
    AxiosSpider("s?k="+req.params.searchText);
    return res.status(200).json({msg:"查询成功"});
});

router.get("/client/searchResult",(req,res)=>{
    // to do
})
module.exports = router;