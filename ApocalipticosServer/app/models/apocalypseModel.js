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
    const {tipopessoa} = body;

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

    if(registrounico || nome || datanascimento || comunidade || profissao || raaf || tipopessoa){
        query += `WHERE `;
    }

    if(registrounico){
        query += `p.registrounico = ${registrounico} `;
        and = 1;
    }

    if(nome){
        query += (and) ? (`AND `) : (``);
        query += `p.nome LIKE '%${nome}%' `;
        and = 1;
    }

    if(datanascimento){
        query += (and) ? (`AND `) : (``);
        query += `p.datanascimento like '%${datanascimento}%' `;
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
        and = 1;
    }

    if(raaf){
        query += (and) ? (`AND `) : (``);
        query += `g.raaf = '${raaf}' `;
        and = 1;
    }

    if(tipopessoa){
        query += (and) ? (`AND `) : (``);
        query += `(CASE WHEN g.raaf IS NULL THEN 'Civil'
                        ELSE 'Guardião'
                    END) = '${tipopessoa}' `;
    }

    console.log(query);

    const pessoas = await connection.query(query);
    return pessoas.rows;
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


module.exports = {
    getPessoas,
    deletePessoa,
    getVeiculos,
    deleteVeiculos,
};