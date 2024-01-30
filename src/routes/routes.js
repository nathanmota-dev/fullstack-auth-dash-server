const express = require('express');
const router = express.Router();
const bycript = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { db } = require('../database/database');

require('../middleware/passaport');

router.post('/register', async (req, res) => {

    const email = req.body.email;
    const username = req.body.username;
    const hashPassword = await bycript.hashSync(req.body.password, 10);
    const password = hashPassword;

    const sql = "INSERT INTO users (email, username, password) VALUES (?, ?, ?)";

    const values = [email, username, password];

    db.query(sql, values, (err, result) => {

        if (err) {

            console.error('Erro ao executar a insersão no SQL:', err);
            res.status(500).send({ error: 'Erro interno do servidor' });
        } else {

            res.send({ message: "Usuário registrado com sucesso" });
        }
    });

});

router.post('/login', async (req, res) => {

    const loginUsername = req.body.username;
    const loginPassword = req.body.password;

    try {
        const result = await dbQueryAsync("SELECT * FROM users WHERE username = ?", [loginUsername]);

        if (result.length > 0) {

            const storedHash = result[0].password;

            const passwordMatch = await bycript.compare(loginPassword, storedHash);

            if (passwordMatch) {

                const token = jwt.sign({ id: result[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' })
                res.json({ token: token, user: result[0] });
            } else {

                res.json({ message: "Combinação de nome de usuário/senha incorreta" });
            }
        } else {

            res.send({ message: "Usuário não encontrado" });
        }
    } catch (error) {

        console.error('Erro ao executar a consulta SQL:', error);
        res.status(500).send({ error: 'Erro interno do servidor' });
    }
});

router.get('/dashboard', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.status(200).send({ message: "Usuário logado" });
});

const dbQueryAsync = (sql, values) => {

    return new Promise((resolve, reject) => {

        db.query(sql, values, (err, result) => {

            if (err) reject(err);
            else resolve(result);
        });
    });
};

module.exports = router;