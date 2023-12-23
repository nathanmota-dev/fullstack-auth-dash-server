require('dotenv').config();
const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const bycript = require('bcrypt');
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

app.listen(port, () => {
    console.log(`Server rodando na porta ${port}`);
});

const db = mysql.createConnection({

    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

app.post('/register', async (req, res) => {

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

app.post('/login', async (req, res) => {

    const loginUsername = req.body.username;
    const loginHashPassword = await bycript.hashSync(req.body.password, 10);
    const loginPassword = loginHashPassword;

    try {
        const result = await dbQueryAsync("SELECT * FROM users WHERE username = ? && password = ?", [loginUsername, loginPassword]);

        if (result.length > 0) {

            res.send(result);
        } else {

            res.send({ message: "Combinação de nome de usuário/senha incorreta" });
        }
    } catch (error) {

        console.error('Erro ao executar a consulta SQL:', error);
        res.status(500).send({ error: 'Erro interno do servidor' });
    }
});

const dbQueryAsync = (sql, values) => {

    return new Promise((resolve, reject) => {

        db.query(sql, values, (err, result) => {

            if (err) reject(err);
            else resolve(result);
        });
    });
};
