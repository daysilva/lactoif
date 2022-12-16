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

const RegistrarProducao = async (n, di, df, qp, obj, id_aux, id_pro, id_tec, id_ing, qut) => {
  const inserir = await Api.post('dados/registrar_producao', {
    nome: n,
    data_inicio: di,
    data_fim: df,
    quantidade_produzida: qp,
    objetivo: obj,
    id_auxiliar: id_aux,
    id_produto: id_pro,
    id_tecnico: id_tec,
    id_ingrediente: id_ing,
    quantidade: qut
  })
}

export {
   ValidarUser,
   PegarTecnicos,
   PegarAuxiliar,
   PegarIngrediente,
   RegistrarProducao
}