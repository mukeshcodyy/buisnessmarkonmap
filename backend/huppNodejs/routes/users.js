const {User} = require('../models/user');
const express = require('express');
const router = express.Router();

router.get(`/`, async (req, res) =>{

        const userList = await User.find({
            email:req.query.email,
            password: req.query.password
        });
        if(userList.length==0){
            res.status(500).json({massage:"User not found !"});

        }else if(userList.length>=1){

            res.status(200).send(userList);
        }

        if(!userList) {
            res.status(500).json({massage:"User not found !"});
        } 
        

})
router.post(`/`,(req, res) =>{
    const user=new User({
        Name: req.body.Name,
        email: req.body.email,
        password: req.body.password,
        businessname: req.body.businessname
    });
    user.save().then((createdUser=> {
        res.status(201).json(createdUser)
    })).catch((err)=>{
        res.status(500).json({
            error: err,
            success: false
        })
    })
    
})

module.exports =router;