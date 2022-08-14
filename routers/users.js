const express = require("express");
const { User } = require("../models/user");
const router = express.Router();
const bcrypt = require('bcryptjs');

//Get all users
router.get('/', async (req, res) => {
    const usersList = await User.find().select('-passwordHash');

    if(!usersList) {
        res.status(500).json({success: false})
    }
    res.send(usersList);
})

//Get a User
router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id).select('-passwordHash');

    if(!user) {
        res.status(500).json({success: false});
    }
    res.send((user));
})

//Create User
router.post(`/`, async (req, res) => {
     let user = new User({
         name: req.body.name,
         email: req.body.email,
         passwordHash: bcrypt.hashSync(req.body.password, 10),
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