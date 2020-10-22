require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/users');
const postRouter = require('./routes/posts');
const categoriesRouter = require('./routes/categories');

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

// 404 Not found
app.use(function (req, res, next) {
    res.status(404).send('Oops aucune page');
    next();
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});

const PORT = process.env.DB_PORT || 8080;
app.listen(PORT, () => {
    console.log('APP listening on ' + PORT);
});
