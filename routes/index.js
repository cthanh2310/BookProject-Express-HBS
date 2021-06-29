const homeRouter = require('./home.js');
const cartRouter = require('./cart.js');
const orderRouter = require('./order.js');
const authRouter = require('./auth.js');
const productRouter = require('./product.js');
function route(app){
    app.use('/', homeRouter);

    app.use('/cart', cartRouter);

    app.use('/my-order', orderRouter);

    app.use('/auth', authRouter);

    app.use('/product', productRouter);
}


module.exports = route;