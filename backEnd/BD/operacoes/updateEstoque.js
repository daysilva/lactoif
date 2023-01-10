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








module.exports = {
    UpdateEstoque
}