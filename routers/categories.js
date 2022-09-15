const { Category } = require('../models/category');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');

//mimetypes
const FILE_TYPE_PATH = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
}

//Images Upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_PATH[file.mimetype];
        let uploadError = new Error('Invalid image type');

        if(isValid) {
            uploadError = null
        }
      cb(uploadError, 'public/uploads/')
    },
    filename: function (req, file, cb) {
      const fileName = file.originalname.replace(' ', '-') //or  split(' ').join('-') 
      const extension = FILE_TYPE_PATH[file.mimetype]
      cb(null, `${fileName}-${Date.now()}.${extension}`);
    }
  })
  
  const uploadOptions = multer({ storage: storage })


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
router.post('/', uploadOptions.single('image'), async (req, res) => {

    const file = req.file;
    if(!file) return res.status(400).send('No image in the request');
 
     const fileName = req.file.filename;
     const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;

    let category = new Category ({
        name: req.body.name,
        image: `${basePath}${fileName}`
    })
    category = await category.save();

    if(!category)
        res.status(404).send(`Category can't be created`)
    
        res.send(category);
    
})

//Update Category
router.put('/:id', uploadOptions.single('image'),  async (req, res) => {
    if(!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).send('Invalid Category ID')
    }

    const category = await Category.findById(req.params.id);
    if (!category) return res.status(400).send('Invalid Category!');
     
    const file = req.file;
    let imagepath;
     
    if (file) {
        const fileName = file.filename;
        const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
        imagepath = `${basePath}${fileName}`;
    } else {
        imagepath = category.image;
    }

    const updatedCategory = await Category.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            image: imagepath
        }, {new: true}
    )

    if(!updatedCategory)
        res.status(500).send('Category can not be updated')
    
    res.send(updatedCategory);
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