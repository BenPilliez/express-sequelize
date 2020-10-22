require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/users');
const postRouter = require('./routes/posts');
const categoriesRouter = require('./routes/categories');
const tagsRouter = require('./routes/tags');

// Initilisation du server express
const app = express();

// Middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

// Routage
app.use('/users', userRouter);
app.use('/posts', postRouter);
app.use('/categories', categoriesRouter);
app.use('/tags', tagsRouter);

// 404 Not found
app.use(function (req, res, next) {
    res.status(404).send('Oops aucune page');
    next();
});

const PORT = process.env.DB_PORT || 8080;
app.listen(PORT, () => {
    console.log('APP listening on ' + PORT);
});
