const apocalypseModel = require('../models/apocalypseModel');

/**
 * Pessoas
 */

const getAllPessoas = async (req, res) => {
    try {
        let {page} = req.query;
        if(page) {
            const pessoas = await apocalypseModel.getPessoasPaged(req.body, page);
            res.status(200).json(pessoas);
            return;
        }

        const pessoas = await apocalypseModel.getAllPessoas();
        res.status(200).json(pessoas);
    } catch(error) {
        res.status(500).send(error);
    }
};

const getPessoasByFilter = async (req, res) => {
    try { 
        const pessoas = await apocalypseModel.getPessoasByFilter(req.body);
        res.status(200).json(pessoas);
    } catch(error) {
        res.status(500).send(error);
    }
};

module.exports = {
    getAllPessoas,
    getPessoasByFilter,
};