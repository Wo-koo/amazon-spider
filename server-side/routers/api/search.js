const express = require("express");
const router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");

router.get("/client/search",(req,res)=>{
    console.log("client/search's req = " + req);
    axios.get(`https://www.amazon.cn/s?k=${req.searchText}`).then(function(res){
        var $ = cheerio.load(res.data);
        console.log($('#price').text)
    }).catch(function(error){
        console.log(error)
    }).finally(function(){
        // always do
    })
});

router.get("/client/searchResult",(req,res)=>{
    // to do
})
module.exports = router;