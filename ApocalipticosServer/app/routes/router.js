const express = require('express');
const router = express.Router();
const apocalypseController = require('../controllers/apocalypseController');

router.get('/', (req, res) => res.status(200).send('Sistema de Gerenciamento de Recursos Pós-Apocalípticos'));


module.exports = router;