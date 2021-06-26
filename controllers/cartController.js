class cartController{
    cart(req, res, next){
        res.render('cart');
    }
}

module.exports = new cartController();