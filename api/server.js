const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');

// connecting to database
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGODB_URI).then(() => {
    app.listen(process.env.PORT || 5000, () => {
        console.log(`Database connected and Backend server is running successfully on port ${process.env.PORT}`);
    })
}).catch((error) => {
    console.log(error);
})

// creating middlewares for the app
app.use(cors());

// add middleware that allows the sending and receiving of json data
app.use(express.json());

app.use('/api/user', userRoute);
app.use('/api/auth/', authRoute);
