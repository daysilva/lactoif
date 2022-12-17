const connection = require('./conexao')

const CadastrarAuxiliar_producao = async (nomeAuxiliar, n_producao) => {

    // descobrir o id da producao
   const idProducao = `select id from producao where n_producao = "${n_producao}"`
   const id_prod = await connection.execute(idProducao)
   console.log(id_prod[0])

    for (let i = 0; i < nomeAuxiliar.length; i++) {

         // asntes dar um select para descobrir qual o id do nome desse tecnico q mandaram
        const id_auxiliar = `select id from auxiliares where nome = "${nomeAuxiliar[i]}"`
        const id_aux = await connection.execute(id_auxiliar)

        const id_Auxiliar2 = await id_aux[0]

        for (let x = 0; x < id_prod[0].length; x++) {
            
             [{nome: id_aux}]
            // vai estar dentro de um for
            console.log(`idAux: ${id_Auxiliar2[i].id} idPro ${id_prod[0][x].id}`)
             const a = 'INSERT INTO auxiliar_produto (id_auxiliar, id_producao) VALUES (?, ?)'
               const auxiliar = await connection.execute(a,
                   [id_aux[0][0].id, id_prod])
            
        }
    }



   // [{nome: }]
   // vai estar dentro de um for
//    const a = 'INSERT INTO auxiliar_produto (id_auxiliar, id_producao) VALUES (?, ?)'
//    const auxiliar = await connection.execute(a,
//        [id_aux[0][0].id, id_prod])
}


/* const exibirAuxi = async (nomeAuxiliar) => {

    const selectTextoInicio = 'select'


    for (let i = 0; i < nomeAuxiliar.length; i++) {
        selectTextoInicio += ' (select id from auxiliares where nome = ' +  nomeAuxiliar[i] + '"),'
    }

    selectTextoInicio += ' from auxiliares'
    console.log(selectTextoInicio) */

    //  const id_aux = await connection.execute(selectTextoInicio)
    //  console.log(id_aux[0])
// }


const aux = ["allan", "Ricardo"]
const prod = "1/2022"


// CadastrarAuxiliar_producao(aux, prod)
exibirAuxi(aux)


