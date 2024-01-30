function ensureAuthenticated(req, res, next) {

    console.log('Middleware ensureAuthenticated');

    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

module.exports = ensureAuthenticated;