const express = require("express");
const router = express.Router();

router.post("/client/search",(req,res)=>{
    $http.get(`https://www.amazon.cn/s?k=${req.body.model.searchText}`).then(function(res){
        console.log(res);
    }).catch(function(error){
        console.log(error)
    }).finally(function(){
        // always do
    })
});

module.exports = router;