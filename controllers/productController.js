class productController{
    product(req, res, next){
        res.render('product');
    }
}

module.exports = new productController();