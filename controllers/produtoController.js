//controllers/produtoController.js

const Produto = require('../models/produto');

/**
 * Renderiza a página inicial da aplicação.
 *
 * @param {import('express').Request} req Objeto da requisição HTTP.
 * @param {import('express').Response} res Objeto da resposta HTTP.
 * @returns {void}
 */
exports.getIndex = (req, res) => {
    res.render('index');
};

/**
 * Renderiza a página Sobre.
 *
 * @param {import('express').Request} req Objeto da requisição HTTP.
 * @param {import('express').Response} res Objeto da resposta HTTP.
 * @returns {void}
 */
exports.getSobre = (req, res) => {
    res.render('sobre');
};

/**
 * Renderiza a página Contato.
 *
 * @param {import('express').Request} req Objeto da requisição HTTP.
 * @param {import('express').Response} res Objeto da resposta HTTP.
 * @returns {void}
 */
exports.getContato = (req, res) => {
    res.render('contato');
};

/**
 * Busca todos os produtos cadastrados e renderiza a página de produtos.
 *
 * @param {import('express').Request} req Objeto da requisição HTTP.
 * @param {import('express').Response} res Objeto da resposta HTTP.
 * @returns {Promise<void>}
 * @throws {Error} Caso ocorra erro ao buscar os produtos.
 */
exports.getProdutos = async (req, res) => {
    try {
        const produtos = await Produto.find();
        res.render('produtos', { produtos });
    } catch (error) {
        console.log(error);
        res.status(500).send('Erro ao carregar produtos');
    }
};

/**
 * Adiciona um novo produto ao banco de dados.
 *
 * @param {import('express').Request} req Objeto da requisição contendo os dados enviados pelo formulário.
 * @param {import('express').Response} res Objeto da resposta HTTP.
 * @returns {Promise<void>}
 * @throws {Error} Caso ocorra erro ao adicionar o produto.
 */
exports.postAddProduto = async (req, res) => {
    try {
        const { nome } = req.body;

        if (nome) {
            await Produto.create({ nome });
        }

        res.redirect('/produtos');
    } catch (error) {
        console.log(error);
        res.status(500).send('Erro ao adicionar produto');
    }
};

/**
 * Remove um produto do banco de dados pelo ID.
 *
 * @param {import('express').Request} req Objeto da requisição contendo o ID do produto.
 * @param {import('express').Response} res Objeto da resposta HTTP.
 * @returns {Promise<void>}
 * @throws {Error} Caso ocorra erro ao deletar o produto.
 */
exports.postDeleteProduto = async (req, res) => {
    try {
        const id = req.params.id;

        await Produto.findByIdAndDelete(id);

        res.redirect('/produtos');
    } catch (error) {
        console.log(error);
        res.status(500).send('Erro ao deletar produto');
    }
};

/**
 * Busca um produto pelo ID e exibe o formulário de edição.
 *
 * @param {import('express').Request} req Objeto da requisição contendo o ID do produto.
 * @param {import('express').Response} res Objeto da resposta HTTP.
 * @returns {Promise<void>}
 * @throws {Error} Caso ocorra erro ao carregar a página de edição.
 */
exports.getEditProduto = async (req, res) => {
    try {
        const id = req.params.id;

        const produto = await Produto.findById(id);

        if (!produto) {
            return res.redirect('/produtos');
        }

        res.render('edit', { produto });
    } catch (error) {
        console.log(error);
        res.status(500).send('Erro ao carregar edição');
    }
};

/**
 * Atualiza os dados de um produto existente.
 *
 * @param {import('express').Request} req Objeto da requisição contendo o ID e os novos dados.
 * @param {import('express').Response} res Objeto da resposta HTTP.
 * @returns {Promise<void>}
 * @throws {Error} Caso ocorra erro ao atualizar o produto.
 */
exports.postUpdateProduto = async (req, res) => {
    try {
        const id = req.params.id;

        await Produto.findByIdAndUpdate(id, {
            nome: req.body.nome
        });

        res.redirect('/produtos');
    } catch (error) {
        console.log(error);
        res.status(500).send('Erro ao atualizar produto');
    }
};