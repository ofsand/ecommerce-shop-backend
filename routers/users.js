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
     product = await product.save();
 
     if(!product) 
         res.status(500).json("Product can't be created");
 
         res.send(product);
 })


module.exports = router;