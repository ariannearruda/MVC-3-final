const User = require('../models/User');

// Mostrar tela de login
exports.getLogin = (req, res) => {
    res.render('login');
};

// Mostrar tela de cadastro
exports.getRegister = (req, res) => {
    res.render('register');
};

// Cadastrar usuário
exports.postRegister = async (req, res) => {
    try {
        const { email, senha } = req.body;

        const usuarioExiste = await User.findOne({ email });

        if (usuarioExiste) {
            return res.send('Usuário já existe');
        }

        await User.create({
            email,
            senha
        });

        res.redirect('/login');

    } catch (error) {
        console.log(error);
        res.send('Erro ao cadastrar usuário');
    }
};

// Processar login
exports.postLogin = async (req, res) => {
    try {
        const { email, senha } = req.body;

        const user = await User.findOne({ email, senha });

        if (!user) {
            return res.send('E-mail ou senha inválidos');
        }

        // Salva usuário na sessão
        req.session.user = {
            id: user._id,
            email: user.email
        };

        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.send('Erro ao fazer login');
    }
};

// Logout
exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
};