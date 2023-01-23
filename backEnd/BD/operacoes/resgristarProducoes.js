const connection = require('../conexao')



// operacoes de insert para um gegistro de producao

// OBS nome_produto e produto_criado são a mesma coisa
// está percorrendo um array que tem objetos
const CadastrarProduto = async (n_producao, data_inicio, data_fim, regristro_ocorrencia, objetivo) => {

    
    try {
        const a = "insert into producao (n_producao, data_inicio, data_fim, regristro_ocorrencia, objetivo) values (?, ?, ?, ?, ?)"
        const cadastrar = await connection.execute(a,
        [n_producao, data_inicio, data_fim, regristro_ocorrencia, objetivo])    


    } catch (e) {
        console.log("erro ao cadastrar producao " + e)
    }


}


const CadastrarProduto_producao = async (n_producao, produto_criado) => {

    let values = []

    const idProducao = `select id from producao where n_producao = "${n_producao}"`
   const id_prod = await connection.execute(idProducao)

   // vai pegar todos os ids e depois filtrar dentro de um if para mandar so quem foi selecionado pelo nome
   const id_nomeProduto = `select id, nome_produto from nome_produto`
   const id_nomeProd = await connection.execute(id_nomeProduto)

 
    for (let i = 0; i < produto_criado.length; i++) {  // percorre pegando os nomes vindo do fronte
        // if produto_criado.nome == id_nomeProd[0][x].nome
        for (let x = 0; x < id_nomeProd[0].length; x++) {  // percorre os nomes vindo do banco
            
            let nomeProdFront = produto_criado[i].nome_produto
            let nomeProdBanco = id_nomeProd[0][x].nome_produto

            if (nomeProdFront == nomeProdBanco) {

                values.push([id_prod[0][0].id, id_nomeProd[0][x].id, produto_criado[i].quantidade_produzida])
            }
        }
    }

    try {
        var sql = "INSERT INTO produto_producao (id_producao, id_produto, quantidade_produzida) VALUES ?"
       
        const a = await connection.query(sql, [values])
       } catch (e) {

        return console.log("colunas duplicadas " + e)
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
// tambem virá em um array 
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
 


 //funcao para  nao regristar o mesmo numero de producao
const pegarNomeproducao = async() => {
    const nome_producao = 'select n_producao from producao'
    const n_pro = await connection.execute(nome_producao)
    
    return n_pro[0]
 }
 const validarNomeProducao = async(n_producao)=> {
    const pg_producao = await pegarNomeproducao()

    for (let i = 0; i < pg_producao.length; i++) {
        if (n_producao == pg_producao[i].n_producao){ 
            return false

        }
        
    }
 }


// funcao que contem tododas as funcoes necessarias para cadastrar uma produção
// cada funcao faz um insert na tabelas que formam um registro de produção como um todo
const CadastrarProducao = async (produto_criado, n_producao, data_inicio, data_fim, regristro_ocorrencia, objetivo,
    nomeAuxiliar, nome_tecnico, ingredientesUtili) => {

    await CadastrarProduto(n_producao, data_inicio, data_fim, regristro_ocorrencia, objetivo)
    await CadastrarProduto_producao(n_producao, produto_criado)
    await CadastrarAuxiliar_producao(nomeAuxiliar, n_producao)
    await CadastrarTecnico_producao(nome_tecnico, n_producao)
    await CadastrarIngrediente(ingredientesUtili, n_producao)
}


const insertAuxiliar = async (nome_auxiliar) => {
    try {
        const cadastrar = await connection.execute("insert into auxiliares (nome) value (?)", [nome_auxiliar])
    }
    catch (erro) {
        return console.log("nao foi possivel inserir o auxiliar " + e)
    }
}

module.exports = {
    CadastrarProducao,
    validarNomeProducao,
    insertAuxiliar
}