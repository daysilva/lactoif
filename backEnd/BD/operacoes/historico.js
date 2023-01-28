const connection = require('../conexao')



const pegarProducao = async (n_producao) => {
    const producao = await connection.execute('SELECT * FROM producao where n_producao = ?',[n_producao])
    return producao[0][0]
}



const PegarProdutosProduzidos = async (n_producao) => {
    
    const a = `select nome_produto.nome_produto, produto_producao.quantidade_produzida, nome_produto.medicao 
    from nome_produto join produto_producao on produto_producao.id_produto = nome_produto.id
    join producao on producao.id = produto_producao.id_producao
    where producao.n_producao = ?`
    const produtos = await connection.execute(a, [n_producao])

    return produtos[0]
}


const pegarAxiliarProducao = async (n_producao) => {
    const id_producao = await pegarProducao(n_producao)
    
    const a = `select auxiliares.nome from auxiliares 
    join auxiliar_produto on auxiliar_produto.id_auxiliar = auxiliares.id 
    where auxiliar_produto.id_producao = ?`

    const auxiliar = await connection.execute(a, [id_producao.id])
    return auxiliar[0]
}


const pegarTecnicoProduto = async (n_producao) => {
    const id_producao = await pegarProducao(n_producao)

    const a = `select tecnicos.nome from tecnicos 
    join tecnico_produto on tecnico_produto.id_tecnico = tecnicos.id 
    where tecnico_produto.id_producao = ?`

    const tecnico = await connection.execute(a, [id_producao.id])
    return tecnico[0]
}


const pegarIngredienteProduto = async (n_producao) => {
    const id_producao = await pegarProducao(n_producao)
    const a = `select ingredientes.nome, ingrediente_produto.quantidade, ingredientes.medicao from ingredientes 
    join ingrediente_produto on ingrediente_produto.id_ingrediente = ingredientes.id 
    where ingrediente_produto.id_producao = ?`
    const ingrediente = await connection.execute(a, [id_producao.id])

    return ingrediente[0]
}


// retornar todas as informacoes que minhas funcoes pegam em um unico objeto
const getHistorico = async (n_producao) => {
    const Producao = await pegarProducao(n_producao)
    const produtoProducao = await PegarProdutosProduzidos(n_producao)
    const auxiliarProducao = await pegarAxiliarProducao(n_producao)
    const tecnicoProducao = await pegarTecnicoProduto(n_producao)
    const ingredienteProduto = await pegarIngredienteProduto(n_producao)

    const dados = {
        id: Producao.id,
        n_producao: Producao.n_producao,
        data_inicio: Producao.data_inicio,
        data_fim: Producao.data_fim,
        registro_ocorrencia: Producao.regristro_ocorrencia,
        objetivo: Producao.objetivo,
        produto_producao: produtoProducao,
        auxiliar_producao: auxiliarProducao,
        tecnico_producao: tecnicoProducao,
        ingrediente_produto: ingredienteProduto
    }
    return dados
}

module.exports = {
    getHistorico
}
