const passport = require('passport');

module.exports = function checkAuthentication(req, res, next) {

    passport.authenticate('jwt', { session: false }, async (error, token) => {
        if (error || !token) {

            res.status(401).json({ message: 'Unauthorized' });
        } else {

            try {

                const user = await User.findOne({
                    where: { id: token.id },
                });
                req.user = user;
                next();
            } catch (error) {

                next(error);
            }
        }
    })(req, res, next);
};
