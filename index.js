require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const passport = require('passport');
const port = process.env.PORT || 3001;
const routes = require('./src/routes/routes');
//const checkAuth = require('./src/authentication/authMiddleware'); 
require('./src/middleware/passaport');

app.use(express.json());
app.use(cors());
app.use(passport.initialize());
//app.use(passport.session())
//app.use(checkAuth);

app.use(routes);

app.listen(port, () => {
    console.log(`Server rodando na porta ${port}`);
});