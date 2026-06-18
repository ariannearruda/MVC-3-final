//models/produto.js

const mongoose = require('mongoose');

/**
 * Schema do produto utilizado pelo Mongoose.
 * Define a estrutura dos documentos salvos na coleção de produtos.
 *
 * @type {mongoose.Schema}
 */
const produtoSchema = new mongoose.Schema({
    /**
     * Nome do produto.
     *
     * @type {String}
     * @required
     */
    nome: {
        type: String,
        required: true
    }
});

/**
 * Model Produto responsável pela comunicação com a coleção de produtos no MongoDB.
 *
 * @class Produto
 */
module.exports = mongoose.model('Produto', produtoSchema);