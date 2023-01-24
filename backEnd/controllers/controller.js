const Operacoes = require('../BD/operacoesGerais')

const OperacoesRegistrar = require("../BD/operacoes/resgristarProducoes")

const PegarUltimoRegistro = require("../BD/operacoes/ProducaoRegistrada")

const PegarHistorico = require("../BD/operacoes/historico")

const OperacoesUpdate = require("../BD/operacoes/updateRegistro")

const UpdateEstoque = require("../BD/operacoes/updateEstoque")


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


// antes de fazer o registro de uma producao devemos inserir outros possiveis auxiliares
const insertAuxiliar = async (req, res) => {
    try {
        const dados = await req.body
        await OperacoesRegistrar.insertAuxiliar(dados.nome_auxiliar)

        return res.status(200).json({msg: "dados cadastrados"})
    }
    catch (erro) {
        return res.json({msg: "falha na requisicao " + erro})
    }
}


// antes de fazer o registro de uma producao devemos inserir outros possiveis produtos
const insertProduto = async (req, res) => {
    try {
        const dados = await req.body
        await OperacoesRegistrar.insertProduto(dados.nome_produto, dados.medicao)

        return res.status(200).json({msg: "dados cadastrados"})
    }
    catch (erro) {
        return res.json({msg: "falha na requisicao " + erro})
    }
}

 
// pegar os valores que o usuario marcou no registro e inserir no banco
const CadastrarProducao = async (req, res) => {
    try {
        const dados = await req.body

        const validar = await OperacoesRegistrar.validarNomeProducao(dados.n_producao)

        if (dados.nomeProd_Criado[0].nome_produto == "" || dados.nomeProd_Criado[0].quantidade_produzida == 0 
        || dados.n_producao == "" || dados.data_inicio == "" || 
        dados.data_fim == "" || dados.objetivo == "" 
        || dados.nomeAuxiliares == '' || dados.nomeTecnicos == '' 
        || dados.ingredientesUtili[0].nome_ingrediente == "" || dados.ingredientesUtili[0].quantidade == 0) {

            return res.status(200).json(false)
        }

        else if (validar == false ){
            return res.status(200).json(false)
       }
        
        else {
            // cadastrar no banco
                await OperacoesRegistrar.CadastrarProducao(dados.nomeProd_Criado, dados.n_producao, 
                dados.data_inicio, dados.data_fim,
                dados.regristro_ocorrencia, dados.objetivo, dados.nomeAuxiliares,
                dados.nome_tecnicos, dados.ingredientesUtili);

                return res.status(200).json({msg: "dados cadastrados"})
        }
       

    } catch (erro) {
        return res.json({msg: "falha ao registrar producao" + erro})
    }
}



// retornar os dados da producao que o usuario acabou de registrar
const ultimoRegistro = async (req, res) => {

   try {
        const dados = await PegarUltimoRegistro.producaoRegistrada()
        return res.status(200).json(dados)
   } 

   catch (erro) {
        return res.json({msg: "falha na requisicao " + erro})
   }
}


const pegarNomeDeProducao = async (req, res) => {
    try {
        const dados = await Operacoes.PegarNomesDeProducao()
        return res.status(200).json(dados)
    }
    catch (erro) {
        return res.json({msg: "falha ao registrar producao" + erro})
    }
}

const getHistorico = async (req, res) => {

    try {
        const n_producao = await req.params
        const n_prod = n_producao.n_producao.replace("-", "/")

        const dados = await PegarHistorico.getHistorico(n_prod)
        return res.status(200).json(dados)
    }

    catch (erro) {
        return res.json({msg: "falha na requisicao " + erro})
    }
}


const atualizarRegistro  = async (req, res) => {
    try {
        const dados = await req.body
       
        const n_producao = await req.params
        const n_prod = n_producao.n_prod.replace("-", "/")

        await OperacoesUpdate.atualiarRegistro(dados, n_prod)

        return res.json({msg: "valores atualizados"})

    } 
    catch (erro) {
        return res.json({msg: "falha na requisicao " + erro})
    }
}


const AtualizarEstoque = async (req, res) => {
    try {
        const dados = await req.params

        await UpdateEstoque.UpdateEstoque(dados.nome_ingrediente, dados.quantidade)
        return res.status(200).json({msg: "dados atualizados"})

    }
    catch (erro) {
        return res.json({msg: "falha na requisicao " + erro})
    }
}


module.exports = {
    fazerlogin,
    pegarTecnicos,
    pegarAuxiliares,
    PegarIngredientes,
    PegarProdutos,
    CadastrarProducao,
    ultimoRegistro,
    pegarNomeDeProducao,
    getHistorico,
    atualizarRegistro,
    AtualizarEstoque,
    insertAuxiliar,
    insertProduto
}