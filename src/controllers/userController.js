const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');

const register = async (req, res) => {

    try {
        const senhaCriptografada = await bcrypt.hash(req.body.senha, 10);
        req.body.senha = senhaCriptografada;
        const usuario = await userModel.create(req.body);
        res.status(201).json({
            statusCode: 201,
            message: 'Usuário criado com sucesso',
            usuario: usuario
        });
    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            message: error.message
        });
    }
};

const login = async (req, res) => {

    try {
        const usuario = await userModel.findOne({
            email: req.body.email
        });
        if (usuario) {
            const senhaCorreta = await bcrypt.compare(req.body.senha, usuario.senha);
            if (senhaCorreta) {
                res.status(200).json({
                    statusCode: 200,
                    message: 'Usuário autenticado com sucesso'
                });
            } else {
                res.status(401).json({
                    statusCode: 401,
                    message: 'Senha incorreta'
                });
            }
        } else {
            res.status(404).json({
                statusCode: 404,
                message: 'E-mail não encontrado'
            });
        }

    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            message: error.message
        });
    }
};

const dashboard = async (req, res) => {

    try {
        const usuarios = await userModel.find();
        res.status(200).json({
            statusCode: 200,
            usuarios: usuarios
        });
    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            message: error.message
        });
    }
};

module.exports = {
    register,
    login,
    dashboard
};