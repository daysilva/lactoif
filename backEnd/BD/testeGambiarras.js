const connection = require('./conexao')



const pegarProducao = async (n_producao) => {
    const producao = await connection.execute('SELECT * FROM producao where n_producao = ?',[n_producao])
    return producao[0][0]
}


const updateProduto_producao = async (id_producao, col, valor, id_produto) => {
    
    // em valor virá o nome do produto
    // temos que descobrir o id desse produto pelo nome

    const a = `update produto_producao set ${col} = ? 
    where id_producao = ? and id_produto = ?`

    const produtoProducao = await connection.execute(a, [valor, id_producao, id_produto])
}


const atualiarRegistro = async (dados, n_producao) => {

   try {
    const id_producao = await pegarProducao(n_producao)

    // descobrir o id do produto pelo nome
    const a = `select nome_produto.id, nome_produto.nome_produto,
    produto_producao.quantidade_produzida, produto_producao.id_produto
    from nome_produto 
    join produto_producao on produto_producao.id_produto = nome_produto.id
    where produto_producao.id_producao = ?`

    const produto = await connection.execute(a, [id_producao.id])
    console.log(produto[0])

    if (dados != null) {
        for (let i = 0; i < dados.length; i++) {
        
            for (let prod = 0; prod < produto[0].length; prod++) {
                if (dados[i].nome_produto == produto[0][prod].nome_produto) {
                    console.log(produto[0][prod].id)
                    const nome_col = Object.keys(produto[0][prod])
                 
                    await updateProduto_producao(id_producao.id, nome_col[1], produto[0][prod].id)
                }
            }
             
        }
    }
   }
   catch (erro) {
    console.log("erooo" + erro)
   }
}


let nome_produtos = [
    {nome_produto: "iorgute", quantidade_produzida: 2}, 
    {nome_produto: "doce", quantidade_produzida: 3},
    {nome_produto: "bolo", quantidade_produzida: 6}
]

atualiarRegistro(nome_produtos, '2/2023')

