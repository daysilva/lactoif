const connection = require('../conexao')

// vai ter q especificar qual tabela será atualizada
// teremos uma rota do tipo put   -> recebe o n_producao como parametro
// e outra do tipo delete   -> recebe o n_producao como parametro


const pegarProducao = async (n_producao) => {
    const producao = await connection.execute('SELECT * FROM producao where n_producao = ?',[n_producao])
    return producao[0][0]
}


// as tabelas que serão atualizadas

const updateProducao = async (n_producao, ) => {
    const id_producao = await pegarProducao(n_producao)

    const a = ``

    const auxiliar = await connection.execute(a, [id_producao.id])
    return auxiliar[0]
}

