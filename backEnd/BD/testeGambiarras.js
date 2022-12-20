const connection = require('./conexao')



const CadastrarProduto_criado = async (produto_criado) => {
    let values = []

    for (let i = 0; i < produto_criado.length; i++) {
        values.push([produto_criado[i].nome_produto, produto_criado[i].quantidade_produzida])
    }

    try {
        console.log(values)
        var sql = "INSERT INTO produto_criado (nome_produto, quantidade_produzida) VALUES ?"
       
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

const produto_cr = [{nome_produto: "iorgute", quantidade_produzida: 2}, {nome_produto: "doce", quantidade_produzida: 3}]

// CadastrarProduto("2/2022", "2022-12-31 23:59:59", "2022-12-31 6:59:59", p, "nada", "nada")
CadastrarProduto_criado(produto_cr)

// CadastrarIngrediente(ingr, prod)