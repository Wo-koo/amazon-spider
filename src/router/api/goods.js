const express = require('express')
const router = express.Router();
const Hero = require('../../models/Goods');


router.post('/client/hero/add',(req,res)=>{
    req.model.findOne({name:req.body.name})
    .then(hero=>{
        if(hero){
            return res.status(400).json({name:req.body.name,msg:"相同的英雄已经被创建"})
        }else{
            // console.log(`hero = ${hero}`);
            req.model.create(req.body,(err,newHero)=>{
                if(err){
                    res.status(400).json({msg:err});
                }else{
                    res.status(200).json({msg:"新英雄创建成功"});
                }
            });
        }
    })
})

router.get('/client/hero/list',async (req,res)=>{
    let heros = await Hero.find().limit(100);
    res.json(heros);
});

router.get('/client/hero/:id',async (req,res)=>{
    let hero = await Hero.findById(req.params.id);
    res.json(hero);
});

router.delete('/client/hero/:id',async (req,res)=>{
    await Hero.findByIdAndDelete(req.params.id);
    res.status(200).json({msg:"英雄删除成功"});
});

module.exports = router; 