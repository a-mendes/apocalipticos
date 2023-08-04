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
    } catch(error) {
        res.status(500).send(error);
    }
};

const insertPessoa = async (req, res) => {
    try { 
        await apocalypseModel.insertPessoa(req.body);
        res.status(201);
    } catch(error) {
        res.status(500).send(error);
    }
};

const getVeiculos = async (req, res) => {
    try { 
        const pessoas = await apocalypseModel.getVeiculos(req.body);
        res.status(200).json(pessoas);
    } catch(error) {
        res.status(500).send(error);
    }
};

const deleteVeiculos = async (req, res) => {
    try { 
        let {placa} = req.query;
        await apocalypseModel.deleteVeiculos(placa);
    } catch(error) {
        res.status(500).send(error);
    }
};

const getConsumiveis = async (req, res) => {
    try { 
        const pessoas = await apocalypseModel.getConsumiveis(req.body);
        res.status(200).json(pessoas);
    } catch(error) {
        res.status(500).send(error);
    }
};

const deleteConsumiveis = async (req, res) => {
    try { 
        let {localizacao} = req.query;
        await apocalypseModel.deleteVeiculos(localizacao);
    } catch(error) {
        res.status(500).send(error);
    }
};

module.exports = {
    getPessoas,
    deletePessoa,
    getVeiculos,
    deleteVeiculos,
    insertPessoa,
    getConsumiveis,
    deleteConsumiveis,
};