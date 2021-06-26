class homeController {
    home(req, res, next) {
        res.render('home' );
    }
    cart(req, res, next) {
        res.render('cart', { layout: "auth"});
    }
}
module.exports = new homeController();