const express = require('express');
const router = express.Router();
const apocalypseController = require('../controllers/apocalypseController');

router.get('/info', (req, res) => res.status(200).send('Sistema de Gerenciamento de Recursos Pós-Apocalípticos'));


router.post('/pessoas', apocalypseController.getPessoas);
router.delete('/pessoas/delete/', apocalypseController.deletePessoa);



module.exports = router;