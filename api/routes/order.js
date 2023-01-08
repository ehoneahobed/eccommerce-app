const router = require('express').Router();
const Order = require('../models/Order');
const { verifyTokenAndAdmin, verifyTokenAndAuthorization } = require('./verifyToken');


// routes for Orders

// create Order
router.post('/', verifyTokenAndAdmin, async (req, res) => {
    const newOrder = new Order(req.body);

    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    } catch (error) {
        res.status(500).json(error);
    }
});

// update Order
router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, {new: true});

        res.status(200).json(updatedOrder);

    } catch (error) {
        res.status(500).json(error);
    }
})


// delete Order
router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json("Order was successfully deleted!");
    } catch (error) {
        res.status(500).json(error);
    }
})


// get user uart
router.get('/find/:userId', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const order = await Order.findByOne({userId: req.params.userId});
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json(error);
    }
});

// get all orders
router.get('/', verifyTokenAndAdmin, async (req, res) => {
    try {
        const orders = await Order.find();
        
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json(error);
    }
});


module.exports = router;