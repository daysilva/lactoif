const connection = require('./conexao')

const CadastrarAuxiliar_producao = async (nomeAuxiliar, nomeProduto) => {
    // percorrer todos os elementos que estão vindo

    while (true) {
        let i = 0
        // let x = 0
        const valor = null

        if (nomeAuxiliar[i] != undefined || nomeProduto[i] != undefined) {

            if (nomeAuxiliar[i] != undefined) {
                
            }




             // asntes dar um select para descobrir qual o id do nome desse tecnico q mandaram
        const id_auxiliar = `select id from auxiliares where nome = "${nomeAuxiliar[i]}"`
        const id_aux = await connection.execute(id_auxiliar)

        // descobrir o id do produto
        const id_produto = `select id from produto where nome = "${nomeProduto[i].nome}"`
        const id_prod = await connection.execute(id_produto)
        

        // [{nome: }]
        // vai estar dentro de um for
        const a = 'INSERT INTO auxiliar_produto (id_auxiliar, id_produto) VALUES (?, ?)'
        const auxiliar = await connection.execute(a,
            [id_aux[0][0].id, id_prod[0][0].id])

            i++
        }

            }

  
}



const aux = ["allan", "denys"]
const prod = [{nome: "quejo", quantidade: "2"}]


CadastrarAuxiliar_producao(aux, prod)


