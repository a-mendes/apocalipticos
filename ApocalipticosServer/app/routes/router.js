const express = require('express');
const router = express.Router();
const apocalypseController = require('../controllers/apocalypseController');

router.get('/info', (req, res) => res.status(200).send('Sistema de Gerenciamento de Recursos Pós-Apocalípticos'));

router.post('/pessoas', apocalypseController.getPessoas);
router.delete('/pessoas/delete/', apocalypseController.deletePessoa);
router.put('/pessoas/insert/', apocalypseController.insertPessoa);
router.put('/pessoas/update/', apocalypseController.updatePessoa);

router.post('/veiculos', apocalypseController.getVeiculos);
router.delete('/veiculos/delete', apocalypseController.deleteVeiculos)

router.post('/consumiveis', apocalypseController.getConsumiveis);
router.delete('/consumiveis/delete', apocalypseController.deleteConsumiveis);

module.exports = router;