const { Category } = require('../models/category');
const express = require('express');
const router = express.Router();

// Get all Categories
router.get('/', async (req, res) => {
    const categoryList = await Category.find();

    if(!categoryList) {
        res.status(500).json({success: false})
    }
    res.send(categoryList);
})
//Get category by id
router.get('/:id', async (req, res) => {
    const category = await Category.findById(req.params.id);

    if(!category){
        res.status(500).json({message: 'The category with given id was not found'});
    }
    res.status(200).send(category);
})

//Create category
router.post('/', async (req, res) => {
    let category = new Category ({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color
    })
    category = await category.save();

    if(!category)
        res.status(404).send(`Category can't be created`)
    
        res.send(category);
    
})

//Update Category
router.put('/:id', async (req, res) => {
    const category = await Category.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            icon: req.body.icon,
            color: req.body.color
        }, {new: true}
    )

    if(!category)
        res.status(404).send('Category can not be updated')
    
    res.send(category);
})

//Delete category
router.delete('/:id', (req, res) => {
    Category.findByIdAndDelete(req.params.id)
        .then((category) => {
            if(category){
                return res.status(200).json({success: true, message: 'The category is been deleted !'})
            }
            return res.status(404).json({success: false, name:'The category can not be found'})
        })
        .catch((err) => {
            res.status(500).json({success: false, error: err})
        })
})

module.exports = router;