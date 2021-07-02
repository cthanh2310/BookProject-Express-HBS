class adminController{
    login(req, res, next){
        res.render('admin-login', {layout: 'admin-login'});
    }
    
}

module.exports = new adminController();