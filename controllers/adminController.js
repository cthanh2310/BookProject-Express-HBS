class adminController{
    login(req, res, next){
        res.render('admin-login', {layout: 'admin-login'});
    }
    dashboard(req, res, next){
        res.render('dashboard', {layout: 'admin'});
    }
    bookManage(req, res, next){
        res.render('book-manage', {layout: 'admin'});

    }
    billManage(req, res, next){
        res.render('bill-manage', {layout: 'admin'});
    }
    profile(req, res, next){
        res.render('admin-profile', {layout: 'admin'});
    }
}

module.exports = new adminController();