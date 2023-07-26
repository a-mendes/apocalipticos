const apocalypseModel = require('../models/apocalypseModel');


const getAllComunidade = async (req, res) => {
    try {
        let {page} = req.query;
        if(page) {
            const comunidades = await apocalypseModel.getComunidadesPaged(req.body, page);
            res.status(200).json(comunidades);
            return;
        }

        const comunidades = await apocalypseModel.getAllComunidade();
        res.status(200).json(comunidades);
    } catch(error) {
        res.status(500).send(error);
    }
};

const getComunidadesByNome = async (req, res) => {
    try { 
        const comunidades = await apocalypseModel.getComunidadesByNome(req.body);
        res.status(200).json(comunidades);
    } catch(error) {
        res.status(500).send(error);
    }
};

module.exports = {
    getAllComunidade,
    getComunidadesByNome,
};