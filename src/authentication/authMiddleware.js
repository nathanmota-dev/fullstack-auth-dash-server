const passport = require('passport');

module.exports = function checkAuthentication(req, res, next) {

    console.log('Middleware checkAuthentication');

    passport.authenticate('jwt', { session: false }, async (error, user) => {
        try {
            if (error || !user) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            req.user = user;
            next();
        } catch (error) {
            next(error);
        }
    })(req, res, next);
};
