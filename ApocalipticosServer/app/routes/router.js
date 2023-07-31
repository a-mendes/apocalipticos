const express = require('express');
const router = express.Router();
const apocalypseController = require('../controllers/apocalypseController');

router.get('/info', (req, res) => res.status(200).send('Sistema de Gerenciamento de Recursos Pós-Apocalípticos'));

/**
 * Rotas para Pessoas
 */
router.get('/pessoas', apocalypseController.getAllPessoas);
router.get('/pessoas/filtros/', apocalypseController.getPessoasByFilter);




module.exports = router;