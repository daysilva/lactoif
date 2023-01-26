const connection = require('../conexao')


const UpdateEstoque = async (nome_ingrediente, quantidade) => {
    try {
        const a = `update ingredientes set quantidade_estoque = quantidade_estoque + ? where nome = ?`
        const cadastrar = await connection.execute(a, [quantidade, nome_ingrediente])    
    }

    catch (erro) {
        console.log("erro na operacao " + erro)
    }
}



const InsertNovoIngrediente = async (nome, medicao) => {
    try {
        await connection.execute(`insert into ingredientes (nome, quantidade_estoque, medicao) 
        values (?, ${0}, ?)`, [nome, medicao])
    }
    catch (erro) {
        console.log("erro na operacao " + erro)
    }
}



module.exports = {
    UpdateEstoque,
    InsertNovoIngrediente
}