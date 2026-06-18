const express = require('express'); // Importa o módulo express para criar as rotas
const router = express.Router(); // Cria um objeto router para definir as rotas da aplicação
const produtoController = require('../controllers/produtoController'); // Importa o controller de produtos, que contém a lógica de cada rota

// ROTAS PRINCIPAIS
router.get('/', produtoController.getIndex);
router.get('/sobre', produtoController.getSobre);
router.get('/contato', produtoController.getContato);

// ROTAS CRUD DE PRODUTOS
router.get('/produtos', produtoController.getProdutos);
router.post('/produtos/add', produtoController.postAddProduto);
router.post('/produtos/delete/:id', produtoController.postDeleteProduto);

// NOVAS ROTAS PARA EDITAR PRODUTO
router.get('/produtos/edit/:id', produtoController.getEditProduto);   // Mostra o formulário de edição
router.post('/produtos/update/:id', produtoController.postUpdateProduto); // Atualiza o produto

module.exports = router;  // ESSENCIAL
