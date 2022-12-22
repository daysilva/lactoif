const connection = require('./conexao')


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












// teste para cadastrar tecnico e auxiliar
const aux = ["Ramon", "Mayomir"]
// ingrediente gasto em produção
const ingr = [
    {"nome_ingrediente": "leite", "quantidade": 1}, 
    {"nome_ingrediente": "farinha", "quantidade": 1}]
const prod = "1/2022"

// cadastrar produção
const p = ["queijo", "bolo"]

const produto_cr = [{nome_produto: "bolo", quantidade_produzida: 2}, {nome_produto: "doce", quantidade_produzida: 3}]

// CadastrarProduto("2/2022", "2022-12-31 23:59:59", "2022-12-31 6:59:59", p, "nada", "nada")
// CadastrarProduto_criado(produto_cr)

// CadastrarIngrediente(ingr, prod)

// CadastrarProduto('2/2022', "2022-12-31 23:59:59", "2022-12-31 6:59:59", "null", "aula")

CadastrarProduto_producao("1/2022", produto_cr)