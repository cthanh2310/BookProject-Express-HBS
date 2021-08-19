const homeRouter = require('./home.js');
const cartRouter = require('./cart.js');
const orderRouter = require('./order.js');
const authRouter = require('./auth.js');
const productRouter = require('./product.js');
const adminRouter = require('./admin.js');
const profileRouter = require('./profile.js');
const {errorHandler} = require('../middlewares/errorHandler.js');


function route(app) {
    app.use('/', homeRouter);

    app.use('/cart', cartRouter);

    app.use('/my-order', orderRouter);

    app.use('/auth', authRouter);

    app.use('/product', productRouter);

    app.use('/admin', adminRouter);

    app.use('/profile', profileRouter);

    app.all('*', (req, res, next) => {
        const err = new Error('Page Not Found!');
        console.log(err);
        err.statusCode = 404;  // send statusCode and message Error 
        next(err);
    })

    app.use(errorHandler);

}


module.exports = route;