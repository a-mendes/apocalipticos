const {connection} = require('./connection');

const deletePessoa = async (registrounico) => {
    let query = `DELETE FROM pessoas p
                 WHERE p.registrounico = ${registrounico};`;
    await connection.query(query);
};

const getPessoas = async (body) => {
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

    if(registrounico || nome || datanascimento || comunidade || profissao || raaf){
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
    getPessoas,
    deletePessoa,
};