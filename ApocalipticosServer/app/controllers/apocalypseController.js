const apocalypseModel = require('../models/apocalypseModel');

const getPessoas = async (req, res) => {
    try { 
        const pessoas = await apocalypseModel.getPessoas(req.body);
        res.status(200).json(pessoas);
    } catch(error) {
        res.status(500).send(error);
    }
};

const deletePessoa = async (req, res) => {
    try { 
        let {registrounico} = req.query;
        await apocalypseModel.deletePessoa(registrounico);
        res.status(200).json(pessoas);
    } catch(error) {
        res.status(500).send(error);
    }
};

module.exports = {
    getPessoas,
    deletePessoa,
};