const homeRouter = require('./home.js');
const cartRouter = require('./cart.js');
const orderRouter = require('./order.js');
function route(app){
    app.use('/', homeRouter);

    app.use('/cart', cartRouter);

    app.use('/my-order', orderRouter);
}

module.exports = route;