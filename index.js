require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const passport = require('passport');
const port = process.env.PORT || 3001;
const routes = require('./src/routes/routes');
const checkAuthentication = require('./src/authentication/authMiddleware');
const ensureAuthenticated = require('./src/authentication/ensureAuthenticated');
const token = process.env.TOKEN;
require('./src/middleware/passaport');

app.use(express.json());
app.use(cors());
app.use(passport.initialize());
app.use(routes);

app.get('/dashboard', (req, res, next) => {
    console.log('Rota /dashboard');
    next();
}, checkAuthentication, ensureAuthenticated, (req, res) => {
    res.status(200).send({ message: "Usuário logado" });
});

app.get('/plants', async (req, res) => {
    try {
        const response = await fetch(`https://trefle.io/api/v1/plants?token=${token}`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching plants:', error);
        res.status(500).json({ error: 'Failed to fetch plants' });
    }
});

app.listen(port, () => {
    console.log(`Server rodando na porta ${port}`);
});