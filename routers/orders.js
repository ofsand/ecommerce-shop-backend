const express = require('express');
const { Order } = require('../models/order');
const { OrderItem } = require('../models/order-item');
const router = express.Router();


//Get all orders
router.get(`/`, async (req, res) => {
    //Select is used to specify only some attributes!
    const orderList = await Order.find().populate('user', 'name').sort({'dateOrdered' : -1 });
    if(!orderList) {
        res.status(500).json({success: false})
    }
    res.send(orderList);
})

//Get order by Id
router.get(`/:id`, async (req, res) => {
    //Select is used to specify only some attributes!
    const order = await Order.findById(req.params.id);
    if(!order) {
        res.status(500).json({success: false})
    }
    res.send(order);
})


//Create order
router.post('/', async (req,res)=>{
    const orderItemsIds = Promise.all(req.body.orderItems.map(async (orderItem) =>{
        let newOrderItem = new OrderItem({
            quantity: orderItem.quantity,
            product: orderItem.product
        })

        newOrderItem = await newOrderItem.save();

        return newOrderItem._id;
    }))
    const orderItemsIdsResolved =  await orderItemsIds;

    const totalPrices = await Promise.all(orderItemsIdsResolved.map(async (orderItemId) => {
        const orderItem = await OrderItem.findById(orderItemId).populate('product', 'price');
        const totalPrice = orderItem.product.price * orderItem.quantity;
        return totalPrice;
    }))

    const totalPrice = totalPrices.reduce((a,b) => a+b , 0);

    let order = new Order({
        orderItems: orderItemsIdsResolved,
        shippingAddress: req.body.shippingAddress,
        city: req.body.city,
        zipCode: req.body.zipCode,
        phone: req.body.phone,
        status: req.body.status,
        totalPrice: totalPrice,
        user: req.body.user,
        dateOrdered: req.body.dateOrdered
    })
    order = await order.save();

    if(!order)
    return res.status(400).send('the order cannot be created!')

    res.send(order);
})

//Update Order
router.put('/:id', async (req, res) => {
    const order = await Order.findByIdAndUpdate(
        req.params.id,
        {
            shippingAddress: req.body.shippingAddress,
            city: req.body.city,
            zipCode: req.body.zipCode,
            phone: req.body.phone,
            status: req.body.status,
            totalPrice: req.body.totalPrice,
            dateOrdered: req.body.dateOrdered
        }, {new: true}
    )

    if(!order)
        res.status(404).send('Order can not be updated')
    
    res.send(order);
})

//Delete order
router.delete('/:id', (req, res) => {
    Order.findByIdAndDelete(req.params.id)
        .then(async (order) => {
            if(order){
                order.orderItems.map(async orderItem => {
                    await OrderItem.findByIdAndRemove(orderItem);
                })
                return res.status(200).json({success: true, message: 'The order is been deleted !'})
            }
            return res.status(404).json({success: false, name:'The order can not be found'})
        })
        .catch(err => {
            return res.status(500).json({success: false, error: err})
        })
})

//Get total sales
router.get('/get/totalsales', async (req, res)=> {
    const totalSales= await Order.aggregate([
        { $group: { _id: null , totalsales : { $sum : '$totalPrice'}}}
    ])

    if(!totalSales) {
        return res.status(400).send('The order sales cannot be generated')
    }

    res.send({totalsales: totalSales.pop().totalsales})
})

//Get total orders
router.get(`/get/count`, async (req, res) => {
    const orderCount = await Order.countDocuments();

    if(!orderCount) {
        res.status(500).json({success: false});
    }
    res.send({
        orderCount: orderCount
    });
})



module.exports = router;