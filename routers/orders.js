const express = require('express');
const { Order } = require('../models/category');
const { OrderItem } = require('../models/order-item');
const router = express.Router();


//Get all orders
router.get(`/`, async (req, res) => {
    //Select is used to specify only some attributes!
    const orderList = await Order.find();
    if(!orderList) {
        res.status(500).json({success: false})
    }
    res.send(orderList);
})

//Create order
router.post('/', async (req, res) => {
    const orderItemsIds = req.body.orderItem.map(orderItem => {
        let newOrderItem = new OrderItem({
            quantity: orderItem.quantity,
            product: orderItem.product
        })
    })
    let order = new Order ({
        orderItem: orderItemsIds,
        shippingAddress: req.body.shippingAddress,
        city: req.body.city,
        zipCode: req.body.zipCode,
        phone: req.body.phone,
        status: req.body.status,
        totalPrice: req.body.totalPrice,
        user: req.body.user
    })
    //order = await order.save();

    if(!order)
        res.status(404).send(`Order can't be created`)
    
        res.send(order);
    
})




module.exports = router;