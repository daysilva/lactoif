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
    const ingrediente = await connection.execute('SELECT nome, quantidade_estoque FROM ingredientes')
    return ingrediente[0]
}

 

// operacoes de insert para um gegistro de producao
// nome é um  array com um objeto dentro [{}, {}, {}]
const CadastrarProduto = async (nome, data_inicio, data_fim, objetivo) => {

    for (let i = 0; i < nome.length; i++) {
        const a = 'INSERT INTO produto (nome, data_inicio, data_fim, quantidade_produzida, objetivo) VALUES (?, ?, ?, ?, ?)'
        const produto = await connection.execute(a,
        [nome[i].nome, data_inicio, data_fim, nome[i].quantidade_produzida, objetivo])
    }
    // const a = 'INSERT INTO produto (nome, data_inicio, data_fim, quantidade_produzida, objetivo) VALUES (?, ?, ?, ?, ?)'
    // const produto = await connection.execute(a,
    // [nome, data_inicio, data_fim, quantidade_produzida, objetivo])
}


// tanto nome auxiliar quanto nome produto vai ser uma lista
// vou ter que dar vairios wheres para descobrir o valor de cada um
const CadastrarAuxiliar_producao = async (nomeAuxiliar, nomeProduto) => {

     // asntes dar um select para descobrir qual o id do nome desse tecnico q mandaram
    const id_auxiliar = `select id from auxiliares where nome = "${nomeAuxiliar}"`
    const id_aux = await connection.execute(id_auxiliar)

    // descobrir o id do produto
    const id_produto = `select id from produto where nome = "${nomeProduto}"`
    const id_prod = await connection.execute(id_produto)
   

    // [{nome: }]
    // vai estar dentro de um for
    const a = 'INSERT INTO auxiliar_produto (id_auxiliar, id_produto) VALUES (?, ?)'
    const auxiliar = await connection.execute(a,
        [id_aux[0][0].id, id_prod[0][0].id])
}

const CadastrarTecnico_producao = async (id_tecnico, id_produto) => {
    // select
    const a = 'INSERT INTO tecnico_produto (id_tecnico, id_produto) VALUES (?, ?)'
    const tecnico = await connection.execute(a,
        [id_tecnico, id_produto])
}

// nao confundir com pegarIngrediente
// essa funcao é para cadastrar quanto foi gasto de um produto 
const CadastrarIngrediente = async (id_ingrediente, id_produto, quantidade) => {
    // select
    const a = 'INSERT INTO ingrediente_produto (id_ingrediente, id_produto, quantidade) VALUES (?, ?, ?)'
    const ingrediente = await connection.execute(a,
        [id_ingrediente, id_produto, quantidade])
}

const CadastrarProducao = (nome, data_inicio, data_fim, quantidade_produzida, objetivo,
    id_auxiliar, id_produto, id_tecnico, id_ingrediente, quantidade) => {

    CadastrarProduto(nome, data_inicio, data_fim, quantidade_produzida, objetivo)
    CadastrarAuxiliar_producao(id_auxiliar, id_produto)
    CadastrarTecnico_producao(id_tecnico, id_produto)
    CadastrarIngrediente(id_ingrediente, id_produto, quantidade)
}



module.exports = {
    pegarUsuario,
    PegarTecnicos,
    PegarAuxiliares,
    PegarIngredientes,
    CadastrarProducao
}

