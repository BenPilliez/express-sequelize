require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/users');

// Initilisation du server express
const app = express();

// Middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

// Routage
app.use('/users', userRouter);



const PORT = process.env.DB_PORT || 8080;
app.listen(PORT, () => {
    console.log('APP listening on ' + PORT);
});
