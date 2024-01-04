require('dotenv').config();
const express = require('express');
const port = process.env.PORT || 3001;

const userRoutes = require('./src/routes/userRoutes');

const app = express();
app.use(express.json());

userRoutes(app);

app.listen(port, () => {
    console.log(`Server rodando na porta ${port}`);
});
