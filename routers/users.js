const express = require("express");
const { User } = require("../models/user");
const auth = require("../helpers/auth");
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = process.env.secret;


//Get all users
router.get('/', auth("customer:read"),  async (req, res) => {
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

//Update user
//We use here isvalidObjectId to catch Error of not existing Id (this is an alternative way of catch in the promise way)
router.put('/:id', async (req, res) => {
    const userExist = await User.findById(req.params.id);
    let newPassword;
    if(req.body.password){
        newPassword = bcrypt.hashSync(req.body.password, 10);
    }else {
        newPassword = userExist.passwordHash;
    }
    //
    const user = await User.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            email: req.body.email,
            passwordHash: newPassword,
            phone: req.body.phone,
            adress: req.body.adress,
            city: req.body.city,
            isAdmin: req.body.isAdmin,
        }, {new: true}
    )

    if(!user)
        res.status(500).send('User can not be updated')
    
    res.send(user);
})

router.post('/login', async (req, res) => {
    const user = await User.findOne({email: req.body.email})

    if(!user){
        return res.status(400).send('The user is not found');
    }

    if(user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
        const token = user.generateAuthToken();
        return res.status(200).send({user: user.email, token})
    }else{
        return res.status(400).send('Password Wrong !');
    }
})


module.exports = router;