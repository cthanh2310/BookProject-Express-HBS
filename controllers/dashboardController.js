class dashboardController{
    dashboard(req, res, next){
        res.render('dashboard', {layout: 'admin'});
    }
}

module.exports = new dashboardController();