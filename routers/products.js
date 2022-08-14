const express = require('express');
const { Category } = require('../models/category');
const { Product } = require('../models/product');
const router = express.Router();
const mongoose = require('mongoose');


//Get all and get with Filter by category
router.get(`/`, async (req, res) => {
    let categoryFilter = {};
    if(req.query.categories) {
        categoryFilter = {category: req.query.categories.split(',')};
    }
    //Select is used to specify only some attributes!
    const productList = await Product.find(categoryFilter).select('name image _id').populate('category');
    if(!productList) {
        res.status(500).json({success: false})
    }
    res.send(productList);
})

//Get a product
router.get('/:id', async (req, res) => {
    const product = await Product.findById(req.params.id).populate('category');

    if(!product) {
        res.status(500).json({success: false});
    }
    res.send((product));
})

//Create product
router.post(`/`, async (req, res) => {
   // console.log('Req :'+req.body._id);
   const category = await Category.findById(req.body.category);
   if(!category)
        return res.status(400).send('Invalid Category')

    let product = new Product({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        images: req.body.images,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
        dateCreated: req.body.dateCreated
    })
    
    //console.log('Product: '+product);
    product = await product.save();

    if(!product) 
        res.status(500).json("Product can't be created");

        res.send(product);
})

//Update product
//We use here isvalidObjectId to catch Error of not existing Id (this is an alternative way of catch in the promise way)
router.put('/:id', async (req, res) => {
    if(!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).send('Invalid Product ID')
    }
    const category = await Category.findById(req.body.category);
    if(!category)
         return res.status(400).send('Invalid Category')

    //
    const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        images: req.body.images,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
        dateCreated: req.body.dateCreated
        }, {new: true}
    )

    if(!product)
        res.status(500).send('Product can not be updated')
    
    res.send(product);
})

//Delete product
//The promise way allow catching Error of product not found
router.delete('/:id', (req, res) => {
    Product.findByIdAndDelete(req.params.id)
        .then((product) => {
            if(product){
                return res.status(200).json({success: true, message: 'The product is been deleted !'})
            }
            return res.status(404).json({success: false, name:'The product can not be found'})
        })
        .catch((err) => {
            res.status(500).json({success: false, error: err})
        })
})

//Custom API to count Products
router.get(`/get/count`, async (req, res) => {
    const productCount = await Product.countDocuments();

    if(!productCount) {
        res.status(500).json({success: false});
    }
    res.send({
        productCount: productCount
    });
})

//Custom API to get Featured Products with limited number parameter
router.get(`/get/featured/:count`, async (req, res) => {
    const count = req.params.count ? req.params.count : 0
    const products = await Product.find({isFeatured: true}).limit(+count);

    if(!products) {
        res.status(500).json({success: false});
    }
    res.send({
        products
    });
})

module.exports = router;