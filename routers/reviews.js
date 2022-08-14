const express = require("express");
const { Review } = require("../models/review");
const router = express.Router();

router.get('/', async (req, res) => {
    const reviewsList = await Review.find();

    if(!reviewsList) {
        res.status(500).json({success: false});
    }
    res.send(reviewsList);
})

router.post('/', (req, res) => {
    const review = new Review({
        review_id: res.body.review_id,
        customer_id: res.body.customer_id,
        product_id: res.body.product_id,
        rating: res.body.rating,
        created_on: res.body.created_on,
        name: res.body.name,
        text: res.body.text
    })
    review.save().then((createdReview => {
        res.status(201).json(createdReview);
    })).catch(err => {
        res.status(500).json(err);
    })
})