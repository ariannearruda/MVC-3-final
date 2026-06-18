const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Tela de login
router.get('/login', authController.getLogin);

// Processar login
router.post('/login', authController.postLogin);

// Tela de cadastro
router.get('/register', authController.getRegister);

// Processar cadastro
router.post('/register', authController.postRegister);

// Logout
router.get('/logout', authController.logout);

module.exports = router;