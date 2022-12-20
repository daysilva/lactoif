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

const CadastrarProduto_criado = async (produto_criado) => {
    let values = []

    for (let i = 0; i < produto_criado.length; i++) {
        values.push([produto_criado[i].nome_produto, produto_criado[i].quantidade_produzida])
    }

    try {
        var sql = "INSERT INTO produto_criado (nome_produto, quantidade_produzida) VALUES ?"
       
        const a = await connection.query(sql, [values])
       } catch (e) {

        return console.log("colunas duplicadas " + e)
       }
}


// OBS nome_produto e produto_criado são a mesma coisa
// está percorrendo um array que tem objetos
const CadastrarProduto = async (n_producao, data_inicio, data_fim, nome_produto, regristro_ocorrencia, objetivo) => {

    // vai pegar todos os ids e depois filtrar dentro de um if para mandar so quem foi selecionado pelo nome
    const id_produto = `select id, nome_produto from produto_criado`
    const id_prod = await connection.execute(id_produto)

    let values = []

    for (let i = 0; i < nome_produto.length; i++) {

        for (let x = 0; x < id_prod[0].length; x++) {

            let nome = nome_produto[i].nome_produto
            let nomePro = id_prod[0][x].nome_produto
           
            if (nomePro == nome) {
                values.push([n_producao, data_inicio, data_fim, id_prod[0][x].id, regristro_ocorrencia, objetivo])
            }
            
        }
       
    }

    try {
        const sql = 'INSERT INTO producao (n_producao, data_inicio, data_fim, id_produto, regristro_ocorrencia, objetivo) VALUES ?'
        const a = await connection.query(sql, [values])

    } catch (e) {
        console.log("erro ao cadastrar producao " + e)
    }


}



// tanto nome auxiliar quanto nome produto vai ser uma lista
// vou ter que dar vairios wheres para descobrir o valor de cada um
const CadastrarAuxiliar_producao = async (nomeAuxiliar, n_producao) => {

    // descobrir o id da producao
   const idProducao = `select id from producao where n_producao = "${n_producao}"`
   const id_prod = await connection.execute(idProducao)
   

    // vai pegar todos os ids e depois filtrar dentro de um if para mandar so quem foi selecionado pelo nome
    const id_auxiliar = `select id, nome from auxiliares`
    const id_aux = await connection.execute(id_auxiliar)


    let values = []


    for (let i = 0; i < nomeAuxiliar.length; i++) {

        for (let x = 0; x < id_aux[0].length; x++) { 
            // esse segundo for será para percorrer id_aux para pegar todos os nomes
            // e filtrar o id pelo nome
            let nome = nomeAuxiliar[i]
            let nomeAux = id_aux[0][x].nome

            if (nomeAux == nome) {
                for (let j = 0; j < id_prod[0].length; j++) {
                   
                    values.push([id_aux[0][x].id, id_prod[0][j].id])
                }
            }
        }
    }

        try {
        var sql = "INSERT INTO auxiliar_produto (id_auxiliar, id_producao) VALUES ?"
       
        const a = await connection.query(sql, [values])
       } catch (e) {

        return console.log("colunas duplicadas " + e)
       }

}

// os nomes dos tecnicos serão uma lista. percorer ela 
// para descobrir os ids
const CadastrarTecnico_producao = async (nome_tecnico, n_producao) => {
    
    // descobrir o id da producao
  const idProducao = `select id from producao where n_producao = "${n_producao}"`
  const id_prod = await connection.execute(idProducao)


  // vai pegar todos os ids e depois filtrar dentro de um if para mandar so quem foi selecionado pelo nome
  const id_tecnico = `select id, nome from tecnicos`
  const id_tec = await connection.execute(id_tecnico)


  let values = []

  for (let i = 0; i < nome_tecnico.length; i++) {

   for (let x = 0; x < id_tec[0].length; x++) { 
       // esse segundo for será para percorrer id_aux para pegar todos os nomes
       // e filtrar o id pelo nome
       let nome = nome_tecnico[i]
       let nomeTec = id_tec[0][x].nome
      
       if (nomeTec == nome) {
           for (let j = 0; j < id_prod[0].length; j++) {
              
               values.push([id_tec[0][x].id, id_prod[0][j].id])
           }
       }
   }
}


try {
   var sql = "INSERT INTO tecnico_produto (id_tecnico, id_producao) VALUES ?"
  
   const a = await connection.query(sql, [values])
  } catch (e) {

   return console.log("colunas duplicadas " + e)
  }

}



// nao confundir com pegarIngrediente
// essa funcao é para cadastrar quanto foi gasto de um produto
// tambem virá emum array 
const CadastrarIngrediente = async (ingredientesUtili, n_producao) => {
    // descobrir o id da producao
   const idProducao = `select id from producao where n_producao = "${n_producao}"`
   const id_prod = await connection.execute(idProducao)
 
 
    // vai pegar todos os ids e depois filtrar dentro de um if para mandar so quem foi selecionado pelo nome
    const id_ingrediente = `select id, nome from ingredientes`
    const id_ing = await connection.execute(id_ingrediente)
 
 
    let values = []
 
   for (let i = 0; i < ingredientesUtili.length; i++) {
 
    for (let x = 0; x < id_ing[0].length; x++) { 
        // esse segundo for será para percorrer id_aux para pegar todos os nomes
        // e filtrar o id pelo nome
        let nome = ingredientesUtili[i].nome_ingrediente
        let nomeIng = id_ing[0][x].nome
       
        if (nomeIng == nome) {
            for (let j = 0; j < id_prod[0].length; j++) {
               
                values.push([id_ing[0][x].id, id_prod[0][j].id, ingredientesUtili[i].quantidade])
            }
        }
    }
 }
 
 
 try {
     var sql = "INSERT INTO ingrediente_produto (id_ingrediente, id_producao, quantidade) VALUES ?"
    
     const a = await connection.query(sql, [values])
    } catch (e) {
  
     return console.log("colunas duplicadas " + e)
    }
 
 }
 


// funcao que contem tododas as funcoes necessarias para cadastrar uma produção
// cada funcao faz um insert na tabelas que formam um registro de produção como um todo
const CadastrarProducao = async (produto_criado, n_producao, data_inicio, data_fim, regristro_ocorrencia, objetivo,
    nomeAuxiliar, nome_tecnico, ingredientesUtili) => {

    await CadastrarProduto_criado(produto_criado)
    await CadastrarProduto(n_producao, data_inicio, data_fim, produto_criado, regristro_ocorrencia, objetivo)
    await CadastrarAuxiliar_producao(nomeAuxiliar, n_producao)
    await CadastrarTecnico_producao(nome_tecnico, n_producao)
    await CadastrarIngrediente(ingredientesUtili, n_producao)
}



module.exports = {
    pegarUsuario,
    PegarTecnicos,
    PegarAuxiliares,
    PegarIngredientes,
    CadastrarProducao
}

