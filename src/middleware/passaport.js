const { ExtractJwt } = require('passport-jwt');
const JwtStrategy = require('passport-jwt').Strategy;
const User = require('../../index');


const passport = require("passport");

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};

passport.use(new JwtStrategy(options, (payload, done) => {

    User.findById(payload.id)
        .then(user => {

            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
        .catch(err => done(err, false));
}));