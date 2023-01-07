const router = require('express').Router();

// routes for cart

// get cart data
router.get('/test', (req, res) => {
    res.send("Test is successful");
});

// create cart
router.post('/test', (req, res) => {
    const {username, password} = req.body;
    res.send(`Your username is ${username} and your password is ${password}`);
})

module.exports = router;