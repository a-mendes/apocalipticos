const {connection} = require('./connection');

/**
 * Pessoas
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
    const {profissao} = body;
    const {raaf} = body;

    let and = 0;
    
    let query = `SELECT p.registrounico, p.nome, p.datanascimento, p.comunidade, c.profissao, g.raaf,
                        (CASE
                            WHEN g.raaf IS NULL THEN 'Civil'
                            ELSE 'Guardião' 
                        END) AS tipopessoa
                 FROM pessoas p 

                 LEFT JOIN civil c 
                 ON p.registrounico = c.registrounico 

                 LEFT JOIN guardioes g 
                 ON p.registrounico = g.registrounico `;

    if(registrounico || nome || datanascimento || comunidade){
        query += `WHERE `;
    }

    if(registrounico){
        query += `p.registrounico = ${registrounico} `;
        and = 1;
    }

    if(nome){
        query += (and) ? (`AND `) : (``);
        query += `p.nome = '${nome}' `;
        and = 1;
    }

    if(datanascimento){
        query += (and) ? (`AND `) : (``);
        query += `p.datanascimento = '${datanascimento}' `;
        and = 1;
    }
    
    if(comunidade){
        query += (and) ? (`AND `) : (``);
        query += `p.comunidade = '${comunidade}' `;
        and = 1;
    }

    if(profissao){
        query += (and) ? (`AND `) : (``);
        query += `c.profissao = '${profissao}' `;
    }

    if(raaf){
        query += (and) ? (`AND `) : (``);
        query += `g.raaf = '${raaf}' `;
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