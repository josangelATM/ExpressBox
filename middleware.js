module.exports.isLogged = function loggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        req.session.returnTo = req.originalUrl
        res.redirect('/login');
    }
}

module.exports.isAdmin = (req,res,next) =>{
    if(req.user.type != 'admin'){
        req.flash('error', 'No tienes acceso a esa página.');
        return res.redirect('/')
    }
    next();
}