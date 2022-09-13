const express = require('express');
const { Review } = require('../models/review');
const router = express.Router();


//Get all reviews
router.get(`/`, async (req, res) => {
    //Select is used to specify only some attributes!
    const reviewList = await Review.find().populate('user', 'name').sort({'created_on' : -1 });
    if(!reviewList) {
        res.status(500).json({success: false})
    }
    res.send(reviewList);
})

//Delete product
//The promise way allow catching Error of product not found
router.delete('/:id', (req, res) => {
    Review.findByIdAndDelete(req.params.id)
        .then((review) => {
            if(review){
                return res.status(200).json({success: true, message: 'The review is been deleted !'})
            }
            return res.status(404).json({success: false, name:'The review can not be found'})
        })
        .catch((err) => {
            res.status(500).json({success: false, error: err})
        })
})

module.exports = router;