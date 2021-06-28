class authController{
    login(req, res, next){
        res.render('login', {layout: 'auth'});
    }
    register(req, res, next){
        res.render('register', {layout: 'auth'});
    }
    auth(req, res, next){
        res.render('auth');
    }
    
}

module.exports = new authController();