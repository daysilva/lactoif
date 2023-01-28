const connection = require('../conexao')

// vai ter q especificar qual tabela será atualizada
// teremos uma rota do tipo put   -> recebe o n_producao como parametro
// e outra do tipo delete   -> recebe o n_producao como parametro


const pegarProducao = async (n_producao) => {
    const producao = await connection.execute('SELECT * FROM producao where n_producao = ?',[n_producao])
    return producao[0][0]
}


// as tabelas que serão atualizadas
// verificar o corpo da requisição a coluna q está sendo alterada

// nomeProd_Criado: this.nomeProd_Criado, // [{nome quant} {nome quant}]
// n_producao: this.n_producao,  // ex. 1/2022
// data_inicio: this.data_inicio.toString().replace("T", " "),
// data_fim: this.data_fim.toString().replace("T", " "),
// regristro_ocorrencia: this.regist_ocorren, // pode ser null
// objetivo: this.objetivo, // talvez possa ser null
// nomeAuxiliares: this.nomeAuxiliares, // ["Allan", "Denys", "Paulo"]
// nome_tecnicos: this.nomeTecnicos, // ["Ramon", "Mayomir", "Paulo"]
// ingredientesUtili: this.ingredientesUtili // [{nome quant}, {nome quant}]

// vou fazer o seguite...
// os valores q as pessoas alterarem, serão colocados no corpo. O que a pessoa não alterar
// ficará null
// ai em controlers, so altero as colunas que não forem null


// RECEBER OS DADOS EM UM FORMATO DIFERENTE?
// producao: null

// producao: [
//     {n_producao: "2/2222"},
//     {data_inicio: "10-10-10"},
//     {data_fim: "10-10-10"},
//     {regristro_ocorrencia: null},
//     {objetivo: null}
// ]

// cada tabela será um array
// e conterá as respectivas colunas que podem estar preenchidas ou nulas (por padrão)

const updateProducao = async (id_producao, col, valor) => {

    try {
        const a = `update producao set ${col} = ? where id = ?`
        const cadastrar = await connection.execute(a, [valor, id_producao])    
    }

    catch (erro) {
        console.log("erro na operacao " + erro)
    }
}


const updateProduto_producao = async (id_producao, col, valor) => {

    const a = `update produto_producao set ${col} = ? 
    where id_producao = 1 and id_produto = 1`

    const auxiliar = await connection.execute(a, [valor])
    return auxiliar[0]
}


const updateAuxiliar_producao = async (n_producao) => {
    const id_producao = await pegarProducao(n_producao)

    const a = ``

    const auxiliar = await connection.execute(a, [id_producao.id])
    return auxiliar[0]
}

const updateTecnico_producao = async (n_producao) => {
    const id_producao = await pegarProducao(n_producao)

    const a = ``

    const auxiliar = await connection.execute(a, [id_producao.id])
    return auxiliar[0]
}


const updateIngrediente_producao = async (n_producao) => {
    const id_producao = await pegarProducao(n_producao)

    const a = ``

    const auxiliar = await connection.execute(a, [id_producao.id])
    return auxiliar[0]
}


const atualiarRegistro = async (dados, n_producao) => {
    try {
     const id_producao = await pegarProducao(n_producao)
 
     if (dados.producao != null) {
         for (let i = 0; i < dados.producao.length; i++) {
             // pegar o nome da coluna(chave)
             const nome_col = Object.keys(dados.producao[i])
             
             // pegar o valor
             const valor_campo = Object.values(dados.producao[i])

            //  atualizar apenas um campo q foi alterado
            // se o campo não tiver sido alterado, será false por padrão
             if (valor_campo[0] != false) {
                await updateProducao(id_producao.id, nome_col[0], valor_campo[0])
             }
             
         }
     }
    
    }
    catch (erro) {
     console.log("erooo" + erro)
    }
 }


const deleteRegristo = async (n_producao) => { 
    try {
        const id_producao = await pegarProducao(n_producao)

        const excluirProdutoProducao = 'delete from produto_producao where id_producao = ?'
        await connection.execute(excluirProdutoProducao, [id_producao.id])
    
        const excluirAuxiliarProduto = 'delete from auxiliar_produto where id_producao = ?'
        await connection.execute(excluirAuxiliarProduto, [id_producao.id])
    
        const excluirIngredientesProdutos = 'delete from ingrediente_produto where id_producao = ?'
        await connection.execute(excluirIngredientesProdutos, [id_producao.id])
    
        const excluirTecnicoProduto = 'delete from tecnico_produto where id_producao = ?'
        await connection.execute(excluirTecnicoProduto, [id_producao.id])
    
        const excluirProducao = 'delete from producao where n_producao = ?'
        await connection.execute(excluirProducao, [n_producao])
    }

    catch (erro) {
        console.log("erooo" + erro)
       }

}

module.exports = {
    deleteRegristo
}

