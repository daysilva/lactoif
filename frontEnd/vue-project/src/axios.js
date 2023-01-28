import axios from "axios"

const Api = axios.create({
  baseURL: 'http://localhost:3333',
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' }
})


// função que vai pegar o nome e a senha do backend pra poder validar
const ValidarUser = async (nome, senha) => {
  const userExists = await Api.get(`login/${nome}/${senha}`)
  return userExists
}


const PegarTecnicos = async () => {
  const tecnico = await Api.get('dados/tecnicos')
  return tecnico
}

const PegarAuxiliar = async () => {
  const auxi = await Api.get('dados/auxiliares')
  return auxi
}

const PegarIngrediente = async () => {
  const ing = await Api.get('dados/ingredientes')
  return ing
}

const PegarProdutos = async () => {
  const prod = await Api.get('dados/produtos')
  return prod
}

// antes de registrar a produção, deve ser possivel inserir um auxiliar
//  que não esteja disponivel para escolher
const IsertAuxiliar = async (nome) => {
  const aux = await Api.post('dados/registrar_auxiliar', {
    nome_auxiliar: nome
  })
}


// registrar algum possivel tecnico que não tenha nas opções
const InsertTecnico = async (nome) => {
  await Api.post('dados/registrar_tecnicos', {
    nome_tecnico: nome
  })
}



// inserir um produto que não esteja na lista de opções
const InsertProduto = async (nome, medicao) => {
  const prod = await Api.post('dados/registrar_produto', {
    nome_produto: nome,
    medicao: medicao
  })
}

// tem que retornar alguma coisa como resposta pra saber
const RegistrarProducao = async (dados) => {
  const inserir = await Api.post('dados/registrar_producao', dados)
}

// exibir uma producao que acabou de ser registrada
const PegarUltimoRegistro = async () => {
  const dados = await Api.get('dados/ultimo_registro')
  return dados
}

const getHistorico = async (n_producao) => {
  const dados = await Api.get(`dados/historico/${n_producao}`)
  return dados
}

//exibirhistorico
const pegarNProducao = async () => {
  const hist = await Api.get('dados/n_producao')
  return hist
}

//
const pesquisarHistorico = async () => {
  const hst = await Api.get('dados/historico/nomeproducao')
  return hst
}
//

// atualizrar estoque
const atualizarEstoque = async (nome, quantidade) => {
  const update = await Api.put(`dados/update/estoque/${nome}/${quantidade}`)
}

// inserir ingrediente
const insertIngrediente = async (nome, medicao) => {
  const ing = await Api.post('dados/estoque/inserir_ingrediente', {
    nome: nome,
    medicao: medicao
  })
}


//  apagar uma producao
const apagarRegistro = async (n_producao) => {
  await Api.delete(`dados/update/deletehistorico/${n_producao}`)
}
 

export {

  ValidarUser,
  PegarTecnicos,
  PegarAuxiliar,
  PegarIngrediente,
  PegarProdutos,
  RegistrarProducao,
  PegarUltimoRegistro,
  getHistorico,
  pegarNProducao,
  atualizarEstoque,
  IsertAuxiliar,
  InsertProduto,
  insertIngrediente,
  apagarRegistro,
  InsertTecnico,
  pesquisarHistorico
}



