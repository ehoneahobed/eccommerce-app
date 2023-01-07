const router = require('express').Router();

// routes for orders

// get order data
router.get('/test', (req, res) => {
    res.send("Test is successful");
});

// create order
router.post('/test', (req, res) => {
    const {username, password} = req.body;
    res.send(`Your username is ${username} and your password is ${password}`);
})

module.exports = router;