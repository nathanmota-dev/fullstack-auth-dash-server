
const cors = require('cors');
const userController = require('../controllers/userController');

module.exports = (app) => {
    app.use(cors());

    app.route('/register')
        .post(userController.register);

    app.route('/login')
        .post(userController.login);

    app.route('/dashboard')
        .get(userController.dashboard);
};
