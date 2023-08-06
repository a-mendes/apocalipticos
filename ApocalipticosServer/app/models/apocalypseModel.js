const {connection} = require('./connection');

const getPessoas = async (body) => {
    const {registrounico} = body;
    const {nome} = body;
    const {datanascimento} = body;
    const {comunidade} = body;
    const {profissao} = body;
    const {raaf} = body;
    const {tipopessoa} = body;
    
    let and = 0;
    
    let query = `SELECT p.registrounico, p.nome, to_char(p.datanascimento, 'dd-mm-yyyy') as datanascimento, p.comunidade, c.profissao, g.raaf,
                (CASE
                    WHEN g.raaf IS NULL THEN 'Civil'
                    ELSE 'Guardião' 
                    END) AS tipopessoa
                    FROM pessoas p 
                    
                    LEFT JOIN civil c 
                    ON p.registrounico = c.registrounico 
                    
                    LEFT JOIN guardioes g 
                    ON p.registrounico = g.registrounico `;
        
    if(registrounico || nome || datanascimento || comunidade || profissao || raaf || tipopessoa){
        query += `WHERE `;
    }
    
    if(registrounico){
        query += `p.registrounico = ${registrounico} `;
        and = 1;
    }
    
    if(nome){
        query += (and) ? (`AND `) : (``);
        query += `UPPER(p.nome) LIKE UPPER('%${nome}%') `;
        and = 1;
    }
    
    if(datanascimento){
        query += (and) ? (`AND `) : (``);
        query += `TO_CHAR(p.datanascimento, 'dd-mm-yyyy') LIKE '%${datanascimento}%' `;
        and = 1;
    }
    
    if(comunidade){
        query += (and) ? (`AND `) : (``);
        query += `UPPER(p.comunidade) LIKE UPPER('%${comunidade}%') `;
        and = 1;
    }
    
    if(profissao){
        query += (and) ? (`AND `) : (``);
        query += `UPPER(c.profissao) LIKE UPPER('%${profissao}%') `;
        and = 1;
    }
    
    if(raaf){
        query += (and) ? (`AND `) : (``);
        query += `g.raaf = ${raaf} `;
        and = 1;
    }
    
    if(tipopessoa){
        query += (and) ? (`AND `) : (``);
        query += `(CASE WHEN g.raaf IS NULL THEN 'CIVIL'
                        ELSE 'GUARDIÃO'
                    END) LIKE UPPER('%${tipopessoa}%') `;
    }
    
    console.log(query);
    
    const pessoas = await connection.query(query);
    return pessoas.rows;
};

const deletePessoa = async (registrounico) => {
    let query = `DELETE FROM pessoas p
                 WHERE p.registrounico = ${registrounico};`;
    await connection.query(query);
};

const insertPessoa = async (body) => {
    const {registrounico} = body;
    const {nome} = body;
    const {datanascimento} = body;
    const {comunidade} = body;

    const {profissao} = body;
    const {raaf} = body;

    let query = `INSERT INTO pessoas(registrounico, nome, datanascimento, comunidade)
                VALUES (${registrounico}, '${nome}', '${datanascimento}', '${comunidade}'); `

    if(raaf){
        query += `INSERT INTO guardioes(registrounico, raaf)
                    VALUES (${registrounico}, ${raaf}); `
    }
    else {
        query += `INSERT INTO civil(registrounico, profissao)`
        if(profissao) query += `VALUES (${registrounico}, '${profissao}'); `
        else query += `VALUES (${registrounico}, NULL); `
    }

    console.log(query);
    await connection.query(query);
};

const updatePessoa = async (body) => {
    const {nome} = body;
    const {datanascimento} = body;
    const {comunidade} = body;
    const {profissao} = body;
    const {raaf} = body;
    const {registrounico} = body;

    let query = `UPDATE pessoas
                SET 
                    nome = '${nome}',
                    datanascimento = '${datanascimento}',
                    comunidade = '${comunidade}'
                WHERE registrounico = ${registrounico}; `; 

    if(raaf){
        query += `UPDATE guardioes
                SET 
                    raaf = ${raaf}
                WHERE registrounico = ${registrounico}; `
    }

    else if(profissao){
        query += `UPDATE civil
                SET 
                    profissao = '${profissao}'
                WHERE registrounico = ${registrounico}; `
    }

    console.log(query);
    await connection.query(query);
};

const getVeiculos = async (body) => {
    const {placa} = body;
    const {modelo} = body;
    const {capacidadecombustivel} = body;
    const {numassentos} = body;
    const {comunidade} = body;
    const {capacidadecarga} = body;

    let and = 0;

    let query = `SELECT v.placa , v.modelo, v.capacidadecombustivel, v.numassentos, v.comunidade, v2.capacidadecarga 
                FROM veiculos v 
                LEFT JOIN veiculoscarga v2 
                ON v2.placa = v.placa `

    if(placa || modelo || capacidadecombustivel || comunidade || numassentos || capacidadecarga){
        query += `WHERE `;
    }

    if(placa){
        query += `v.placa = '${placa}' `;
        and = 1;
    }

    if(modelo){
        query += (and) ? (`AND `) : (``);
        query += `v.modelo = '${modelo}' `;
        and = 1;
    }

    if(capacidadecombustivel){
        query += (and) ? (`AND `) : (``);
        query += `v.capacidadecombustivel = ${capacidadecombustivel} `;
        and = 1;
    }
    
    if(comunidade){
        query += (and) ? (`AND `) : (``);
        query += `p.comunidade = '${comunidade}' `;
        and = 1;
    }

    if(numassentos){
        query += (and) ? (`AND `) : (``);
        query += `v.numassentos = ${numassentos} `;
    }

    if(capacidadecarga){
        query += (and) ? (`AND `) : (``);
        query += `v2.capacidadecarga = ${capacidadecarga} `;
    }

    console.log(query);
    
    const veiculos = await connection.query(query);
    return  veiculos.rows;
};

const deleteVeiculos = async (placa) =>{
    let query = `DELETE FROM veiculos v
                WHERE v.placa = '${placa}' `;

    console.log(query);
    await connection.query(query);
};

const getConsumiveis = async (body) => {
    const {localizacao} = body;
    const {nome} = body;
    const {dataaquisicao} = body;
    const {validade} = body;
    const {quantidade} = body;
    const {enfermidade} = body;

    let and = 0;

    let query = `SELECT c.localizacao, c.nome, c.dataaquisicao, c.validade, c.quantidade, c2.enfermidade
                FROM consumiveis c 
                LEFT JOIN remedio c2 
                ON c2.nome = c.nome AND c.localizacao = c2.localizacao `
    
    if(localizacao || nome || dataaquisicao || validade || quantidade ||enfermidade){
        query += `WHERE `;
    }

    if(localizacao){
        query += `c.localizacao = '${localizacao}' `;
        and = 1;
    }

    if(nome){
        query += (and) ? (`AND `) : (``);
        query += ` c.nome = '${nome}' `;
        and = 1;
    }

    if(dataaquisicao){
        query += (and) ? (`AND `) : (``);
        query += `c.dataaquisicao = ${dataaquisicao} `;
        and = 1;
    }
    
    if(validade){
        query += (and) ? (`AND `) : (``);
        query += `c.validade = '${validade}' `;
        and = 1;
    }

    if(quantidade){
        query += (and) ? (`AND `) : (``);
        query += `c.quantidade = ${quantidade} `;
    }

    if(enfermidade){
        query += (and) ? (`AND `) : (``);
        query += `c2.enfermidade = '${enfermidade}' `;
    }

    console.log(query);
    
    const consumiveis = await connection.query(query);
    return  consumiveis.rows;
};            

const deleteConsumiveis = async (localizacao) => {
    let query = `DELETE FROM consumiveis p
                 WHERE p.localizacao = ${localizacao};`;
    await connection.query(query);
};

module.exports = {
    getPessoas,
    deletePessoa,
    insertPessoa,
    updatePessoa,
    getVeiculos,
    deleteVeiculos,
    getConsumiveis,
    deleteConsumiveis,
};