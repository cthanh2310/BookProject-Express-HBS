class orderController{
    order(req, res, next){
        res.render('order');
    }
}

module.exports = new orderController();