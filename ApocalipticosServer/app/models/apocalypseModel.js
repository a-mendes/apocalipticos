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

const getPessoasByFilter = async (body) => {
    const {registrounico} = body;
    const {nome} = body;
    const {datanascimento} = body;
    const {comunidade} = body;

    let and = 0;
    
    let query = `SELECT * FROM pessoas `;

    if(registrounico || nome || datanascimento || comunidade){
        query += `WHERE `;
    }

    if(registrounico){
        query += `pessoas.registrounico = ${registrounico} `;
        and = 1;
    }

    if(nome){
        query += (and) ? (`AND `) : (``);
        query += `pessoas.nome = '${nome}' `;
        and = 1;
    }

    if(datanascimento){
        query += (and) ? (`AND `) : (``);
        query += `pessoas.datanascimento = '${datanascimento}' `;
        and = 1;
    }

    if(comunidade){
        query += (and) ? (`AND `) : (``);
        query += `pessoas.comunidade = '${comunidade}' `;
    }

    console.log(query);

    const pessoas = await connection.query(query);
    return pessoas.rows;
};



module.exports = {
    getAllPessoas,
    getPessoasPaged,
    getPessoasByFilter,
};