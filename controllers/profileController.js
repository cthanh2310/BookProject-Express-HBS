class profileController{
    profile(req, res, next){
        res.render('profile');
    }
}

module.exports = new profileController();