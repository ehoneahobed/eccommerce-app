const router = require('express').Router();
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

// require user model
const User = require('../models/User');

// routes for user authentication

// registering new user
router.post('/register', async (req, res) => {
    // destructure the request body
    const {username, password, email} = req.body;
    const hashedPassword = CryptoJS.AES.encrypt(password, process.env.SECRET_PASSPHRASE).toString();
    
    const newUser = new User({ username, email, password: hashedPassword });

    try {
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    } catch (error) {
        res.status(500).json(error);
    }
    
})


// logging in a user
router.post('/login', async (req, res) => {
    const { username} = req.body;

    try {
        const user = await User.findOne({ username });
        // check if a user was found otherwise return an error message
        !user && res.status(401).json("Wrong Credentials");

        const decryptedPassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET_PASSPHRASE).toString(CryptoJS.enc.Utf8);
        
        // if a user exists then let's compare the user's password to the password you entered
        decryptedPassword !== req.body.password && res.status(401).json("Wrong Credentials"); 

        // create token for secured authentication after logging in
        const accessToken = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin,
            },
            process.env.JWT_SECRET_KEY,
            {expiresIn: "3d"}
        );

        // if credentials are correct then return the user details from the database excluding the password
        const { password, ...others } = user._doc;
        res.status(200).json({ ...others, accessToken });

    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;