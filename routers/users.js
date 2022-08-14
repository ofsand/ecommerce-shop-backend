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

module.exports = router;