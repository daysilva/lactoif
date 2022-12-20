import axios from "axios"

const Api = axios.create({
    baseURL: 'http://localhost:3333',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
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

const RegistrarProducao = async (produto_criado, n_producao, data_inicio, data_fim, 
  regristro_ocorrencia, objetivo, nomeAuxiliar, nome_tecnico, ingredientesUtili) => {
  const inserir = await Api.post('dados/registrar_producao', {
    
    nomeProd_Criado: produto_criado, // [{nome quant} {nome quant}]
    n_producao: n_producao,  // ex. 1/2022
    data_inicio: data_inicio,
    data_fim: data_fim,
    regristro_ocorrencia: regristro_ocorrencia, // pode ser null
    objetivo: objetivo, // talvez possa ser null
    nomeAuxiliares: nomeAuxiliar, // ["Allan", "Denys", "Paulo"]
    nome_tecnicos: nome_tecnico, // ["Ramon", "Mayomir", "Paulo"]
    ingredientesUtili: ingredientesUtili // [{nome quant}, {nome quant}]
  })
}

export {
   ValidarUser,
   PegarTecnicos,
   PegarAuxiliar,
   PegarIngrediente,
   RegistrarProducao
}