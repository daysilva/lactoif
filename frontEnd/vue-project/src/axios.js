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

const PegarProdutos = async () => {
  const prod = await Api.get('dados/produtos')
  return prod
}

const RegistrarProducao = async (dados) => {
  const inserir = await Api.post('dados/registrar_producao', {
    
    
  })
}

export {
   ValidarUser,
   PegarTecnicos,
   PegarAuxiliar,
   PegarIngrediente,
   PegarProdutos,
   RegistrarProducao
}