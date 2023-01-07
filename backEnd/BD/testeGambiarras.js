const connection = require('./conexao')



// "nomeProd_Criado": [
//     {"nome_produto": "iorgute", "quantidade_produzida": 2}, 
//     {"nome_produto": "doce", "quantidade_produzida": 3},
//     {"nome_produto": "bolo", "quantidade_produzida": 6}

// ]


const pegarProducao = async (n_producao) => {
    const producao = await connection.execute('SELECT * FROM producao where n_producao = ?',[n_producao])
    return producao[0][0]
}


const updateProduto_producao = async (id_producao, col, valor) => {
    
    // em valor virá o nome do produto
    // temos que descobrir o id desse produto pelo nome

    // const a = `update produto_producao set ${col} = ? 
    // where id_producao = ? and id_produto = 1`

    // const auxiliar = await connection.execute(a, [valor, id_producao])
    // return auxiliar[0]
    console.log(id_producao, col, valor)

}


const atualiarRegistro = async (dados, n_producao) => {
   try {
    const id_producao = await pegarProducao(n_producao)

    // descobrir o id do produto pelo nome
    const a = `select nome_produto.id, nome_produto.nome_produto from nome_produto 
    join produto_producao on produto_producao.id_produto = nome_produto.id
    where produto_producao.id_producao = ?`

    const id_produto = await connection.execute(a, [id_producao.id])
    console.log(id_produto[0])

    if (dados != null) {
        for (let i = 0; i < dados.length; i++) {

            // pegar o nome da coluna(chave)
            const nome_col = Object.keys(dados[i])
             
            // pegar o valor
            const valor_campo = Object.values(dados[i])

            // alterar o id do produto
            if (valor_campo[0] != false) {
                // pegar apenas os ids dos produtos que me passaram os nomes
                if (id_produto[i].nome_produto == dados[i].nome_produto) {
                    await updateProduto_producao(id_producao.id, nome_col[0], id_produto[i].id)
                }
            }

            // alterar a quantidade produzida
            if (valor_campo[1] != false) {
                await updateProduto_producao(id_producao, nome_col[1], valor_campo[1])
            }
             
        }
    }
    console.log("foi nao")
   }
   catch (erro) {
    console.log("erooo" + erro)
   }
}

let producao = [
        {n_producao: "2/2222"},
        {data_inicio: "2023-10-10 10:10:10"},
        {data_fim: "2024-10-10 11:11:11"},
        {regristro_ocorrencia: "null"},
        {objetivo: "vamos de teste pra valer..."}
    ]

let nome_produtos = [
    {nome_produto: "iorgute", quantidade_produzida: 2}, 
    {nome_produto: "doce", quantidade_produzida: 3},
    {nome_produto: "bolo", quantidade_produzida: 6}
]

atualiarRegistro(nome_produtos, '2/2020')

