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
}

module.exports = new adminController();