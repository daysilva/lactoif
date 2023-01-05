const connection = require('./conexao')
 

const pegarUsuario = async (nome, senha) => {
    const usuario = await connection.execute( 'SELECT * FROM usuarios WHERE nome = ? AND senha = ?' , 
    [nome, senha])
    return usuario[0][0]
}


// funcoes para o registro de produção
const PegarTecnicos = async () => {
    const tecn = await connection.execute('SELECT nome FROM tecnicos')
    return tecn[0]
}

const PegarAuxiliares = async () => {
    const auxiliar = await connection.execute('SELECT nome FROM auxiliares')
    return auxiliar[0]
}

const PegarIngredientes = async () => {
    const ingrediente = await connection.execute('SELECT nome, quantidade_estoque, medicao FROM ingredientes')
    return ingrediente[0]
}

const PegarProdutos = async () => {
    const produtos = await connection.execute("SELECT DISTINCT(nome_produto), medicao id FROM nome_produto")
    return produtos[0]
}
 

const PegarNomesDeProducao = async () => {
    const n_producao = await connection.execute("select n_producao from producao order by n_producao desc")
    return n_producao[0]
}

PegarNomesDeProducao()

module.exports = {
    pegarUsuario,
    PegarTecnicos,
    PegarAuxiliares,
    PegarProdutos,
    PegarIngredientes,
    PegarNomesDeProducao
}

