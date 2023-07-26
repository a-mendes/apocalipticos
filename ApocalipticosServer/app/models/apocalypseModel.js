const {connection} = require('./connection');

/**
 * Exemplos de rotas supondo o atual modelo ER 
 */

const getAllComunidade = async () => {
    const comunidades = await connection.query('SELECT * FROM comunidade');
    return comunidades.rows;
};

const getComunidadesPaged = async (body, page) => {
    const {page_size} = body;

    pageStart = (page - 1) * page_size;

    let query = `SELECT * FROM comunidade 
                    LIMIT ${page_size} OFFSET ${pageStart};`;
    const comunidades = await connection.query(query);
    return comunidades.rows;
};

const getComunidadesByNome = async (body) => {
    const {nome} = body;
    let query = `SELECT * FROM comunidade 
                    WHERE comunidade.nome = ${nome};`;
    const comunidades = await connection.query(query);
    return comunidades.rows;
};



module.exports = {
    getAllComunidade,
    getComunidadesPaged,
    getComunidadesByNome,
};