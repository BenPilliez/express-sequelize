require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const userRouter = require('./routes/users');
const postRouter = require('./routes/posts');
const categoriesRouter = require('./routes/categories');
const tagsRouter = require('./routes/tags');
const authRouter = require('./routes/auth');
const path = require('path');

// Initilisation du server express
const app = express();

// Middleware
app.use(express.urlencoded({extended: true}));
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors());

// Routage
app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/tags', tagsRouter);
app.use('/api/auth', authRouter);

// 404 Not found
app.use(function (req, res, next) {
    res.status(404).send('Oops aucune page');
    next();
});

app.listen(process.env.APP_PORT || 5000, () => {
    console.log('APP listening on ' + process.env.APP_PORT || 5000);
});
