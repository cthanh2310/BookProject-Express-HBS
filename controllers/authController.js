class authController{
    auth(req, res, next){
        res.render('auth');
    }
}

module.exports = new authController();