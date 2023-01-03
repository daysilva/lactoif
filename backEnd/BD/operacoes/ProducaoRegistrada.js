const connection = require('../conexao')


// selects dos ultimos registros feitos no banco   -> A ULTIMA PRODUCAO FEITA
// nas tabelas 
// PRODUCAO  x
// PRODUTO_PRODUCAO  x
// AUXILIAR_PRODUTO  x
// TECNICO_PRODUTO x
// INGREDIENTE_PRODUTO x



const pegarProducao = async () => {
    const producao = await connection.execute('SELECT * FROM producao ORDER BY id DESC LIMIT 1')
    return producao[0][0]
}



const PegarProdutosProduzidos = async () => {
    const id_producao = await pegarProducao()

    const a = `select nome_produto.nome_produto, produto_producao.quantidade_produzida, nome_produto.medicao 
    from nome_produto join produto_producao on produto_producao.id_produto = nome_produto.id 
    where produto_producao.id_producao = ?`
    const produtos = await connection.execute(a, [id_producao.id])

    return produtos[0]
}


const pegarAxiliarProducao = async () => {
    const id_producao = await pegarProducao()
    const a = `select auxiliares.nome from auxiliares 
    join auxiliar_produto on auxiliar_produto.id_auxiliar = auxiliares.id 
    where auxiliar_produto.id_producao = ?`

    const auxiliar = await connection.execute(a, [id_producao.id])
    return auxiliar[0]
}


const pegarTecnicoProduto = async () => {
    const id_producao = await pegarProducao()
    const a = `select tecnicos.nome from tecnicos 
    join tecnico_produto on tecnico_produto.id_tecnico = tecnicos.id 
    where tecnico_produto.id_producao = ?`

    const tecnico = await connection.execute(a, [id_producao.id])
    return tecnico[0]
}


const pegarIngredienteProduto = async () => {
    const id_producao = await pegarProducao()
    const a = `select ingredientes.nome, ingrediente_produto.quantidade, ingredientes.medicao from ingredientes 
    join ingrediente_produto on ingrediente_produto.id_ingrediente = ingredientes.id 
    where ingrediente_produto.id_producao = ?`
    const ingrediente = await connection.execute(a, [id_producao.id])

    return ingrediente[0]
}


// retornar todas as informacoes que minhas funcoes pegam em um unico objeto
const producaoRegistrada = async () => {
    const Producao = await pegarProducao()
    const produtoProducao = await PegarProdutosProduzidos()
    const auxiliarProducao = await pegarAxiliarProducao()
    const tecnicoProducao = await pegarTecnicoProduto()
    const ingredienteProduto = await pegarIngredienteProduto()

    const dados = {
        id: Producao.id,
        n_producao: Producao.n_producao,
        data_inicio: Producao.data_inicio,
        data_fim: Producao.data_fim,
        registro_ocorrencia: Producao.registro_ocorrencia,
        objetivo: Producao.objetivo,
        produto_producao: produtoProducao,
        auxiliar_producao: auxiliarProducao,
        tecnico_producao: tecnicoProducao,
        ingrediente_produto: ingredienteProduto
    }
    return dados
}


module.exports = {
    producaoRegistrada
}