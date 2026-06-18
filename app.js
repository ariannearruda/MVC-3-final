// Arquivo principal da aplicação
const express = require('express');
const session = require('express-session');
const path = require('path');
const mongoose = require('mongoose');
const authMiddleware = require('./middlewares/auth');
require('dotenv').config();

const app = express();

// Rotas
const produtoRoutes = require('./routes/produtoRoutes');
const authRoutes = require('./routes/authRoutes');

// Conexão com MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB conectado com sucesso!'))
    .catch((err) => console.log('Erro ao conectar no MongoDB:', err));

// Configura o EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para formulários
app.use(express.urlencoded({ extended: true }));

// Sessão
app.use(session({
    secret: 'projeto_mvc_secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 30 // 30 min
    }
}));

// Pasta pública
app.use(express.static(path.join(__dirname, 'public')));

// Rotas de autenticação (SEM proteção)
app.use('/', authRoutes);

// Rotas protegidas
app.use('/', authMiddleware, produtoRoutes);

// Porta do servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});