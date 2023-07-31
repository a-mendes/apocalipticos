const {connection} = require('./connection');

/**
 * Exemplos de rotas supondo o atual modelo ER 
 */

const getAllPessoas = async () => {
    const pessoas = await connection.query('SELECT * FROM pessoas');
    return pessoas.rows;
};

const getPessoasPaged = async (body, page) => {
    const {page_size} = body;

    pageStart = (page - 1) * page_size;

    let query = `SELECT * FROM pessoas 
                    LIMIT ${page_size} OFFSET ${pageStart};`;
    const pessoas = await connection.query(query);
    return pessoas.rows;
};

const getPessoasByRegistroUnico = async (body) => {
    const {registrounico} = body;
    let query = `SELECT * FROM pessoas 
                    WHERE pessoas.registrounico = ${registrounico};`;
    const pessoas = await connection.query(query);
    return pessoas.rows;
};



module.exports = {
    getAllPessoas,
    getPessoasPaged,
    getPessoasByRegistroUnico,
};