const Operacoes = require('../BD/operacoes')



const fazerlogin = async (req, res) => {
    try {
        
        const dadosfront = await req.params
        const dadosBack = await Operacoes.pegarUsuario(dadosfront.nome, dadosfront.senha)

        // verificar se esse usuario existe
        // so retorna true se o usuario existir
        if (dadosBack != null) {
            const nomefront = dadosfront.nome
            const senhafront = dadosfront.senha

            const nomeback = dadosBack.nome
            const senhaback = dadosBack.senha

            if (nomefront == nomeback && senhafront == senhaback) {
                return res.status(200).json(true)
            }
            else {
                return res.status(200).json(false)

            }
        }
        else {
            return res.status(200).json(false)            
        }
        
    } catch (erro) {
        return res.json({msg: "falha na requisicao " + erro})
    }
}


// pegar o nome dos tecnicos e mandar para o frontend
const pegarTecnicos = async (req, res) => {
    try {
        const dados = await Operacoes.PegarTecnicos()
        return res.status(200).json(dados)
    } catch (erro) {
        return res.json({msg: "falha na requisicao " + erro})
    }
}

// pegar o nome dos auxiliares e mandar para o frontend
const pegarAuxiliares = async (req, res) => {
    try {
        const dados = await Operacoes.PegarAuxiliares()
        return res.status(200).json(dados)
    } catch (erro) {
        return res.json({msg: "falha na requisicao " + erro})
    }
}


// pegar o nome dos igredientes, a quant e mandar para o frontend
const PegarIngredientes = async (req, res) => {
    try {
        const dados = await Operacoes.PegarIngredientes()
        return res.status(200).json(dados)
    } catch (erro) {
        return res.json({msg: "falha na requisicao " + erro})
    }
}

 
// pegar os valores que o usuario marcou no registro e inserir no banco
const CadastrarProducao = async (req, res) => {
    try {
        const dados = await req.body
        if (dados.nome == "") {
            return res.status(200).json(false)
        }

        else if (dados.data_inicio == "") {
            return res.status(200).json(false)
            
        }
        else if (dados.data_fim == "") {
            return res.status(200).json(false)
        }
        else if (dados.quantidade_produzida == "") {
            return res.status(200).json(false)

        }
        else if (dados.objetivo == "") {
            return res.status(200).json(false)

        }
        else if (dados.id_auxiliar == "") {
            return res.status(200).json(false)

        }
        else if (dados.id_produto == "") {
            return res.status(200).json(false)

        }
        else if (dados.id_tecnico == "") {
            return res.status(200).json(false)

        }
        else if (dados.id_ingrediente == "") {
            return res.status(200).json(false)

        }
        else if (dados.quantidade == "") {
            return res.status(200).json(false)
        }

        else {
            // cadastrar no banco
            // return res.status(200).json({olhai: dados})
            // Operacoes.CadastrarProducao(dados.nome, dados.data_inicio, dados.data_fim,
            //     dados.quantidade_produzida, dados.objetivo, dados.id_auxiliar,
            //     dados.id_produto, dados.id_tecnico, dados.id_ingrediente, dados.quantidade)
            //     return res.status(200).json({msg: "dados cadastrados"})
        }
       

    } catch (erro) {
        return res.json({msg: "falha ao registrar producao" + erro})
    }
}

//  return res.status(200).json({olhai: dados})

// x.forEach((x) => {if (pessoas[x] == "day") {console.log("dayyyyyyy")}})

module.exports = {
    fazerlogin,
    pegarTecnicos,
    pegarAuxiliares,
    PegarIngredientes,
    CadastrarProducao
}