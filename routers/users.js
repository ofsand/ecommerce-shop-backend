const express = require("express");
const { User } = require("../models/user");
const router = express.Router();

router.get('/', async (req, res) => {
    const usersList = await User.find();

    if(!usersList) {
        res.status(500).json({success: false})
    }
    res.send(usersList);
})

//Create User
router.post(`/`, async (req, res) => {
     let user = new User({
         name: req.body.name,
         email: req.body.email,
         passwordHash: req.body.passwordHash,
         phone: req.body.phone,
         adress: req.body.adress,
         city: req.body.city,
         isAdmin: req.body.isAdmin,
     })
     
     //console.log('Product: '+product);
     user = await user.save();
 
     if(!user) 
         res.status(500).json("User can't be created");
 
         res.send(user);
 })


module.exports = router;