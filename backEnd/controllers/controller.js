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


// pegar o nome dos produtos que são feitos
const PegarProdutos = async (req, res) => {
    try {
        const dados = await Operacoes.PegarProdutos()
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
        else if (dados.n_producao == "") {
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
        else if (dados.nomeAuxiliares == "") {
            return res.status(200).json(false)

        }
        else if (dados.nome_tecnicos == "") {
            return res.status(200).json(false)

        }
       
        
        else if (dados.ingredientesUtili == "") {
            return res.status(200).json(false)

        }
        
        else {
            // cadastrar no banco
                await Operacoes.CadastrarProducao(dados.nomeProd_Criado, dados.n_producao, 
                dados.data_inicio, dados.data_fim,
                dados.regristro_ocorrencia, dados.objetivo, dados.nomeAuxiliares,
                dados.nome_tecnicos, dados.ingredientesUtili);

                return res.status(200).json({msg: "dados cadastrados"})
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
    PegarProdutos,
    CadastrarProducao
}