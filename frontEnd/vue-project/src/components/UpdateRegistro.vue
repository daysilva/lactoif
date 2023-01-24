<script>
import {
  PegarTecnicos,
  PegarAuxiliar,
  PegarIngrediente,
  PegarProdutos,
  RegistrarProducao,
} from "../axios";

export default {
  name: "UpdateRegistro",
  props: {
    dados: Object
  },

  data() {
    return {
      nomeTec: "",
      nomeAuxi: "",
      nomeIngred: "",
      nomeProdutos: "",

      data_inicio: "",
      data_fim: "",

      exibe_data_inicio: true,
      exibe_confg_data_inicio: false,
      exibe_data_fim: true,
      exibe_confg_data_fim: false,
      exibe_tecnicos: true,
      exibe_confg_tecnicos: false,
      exibir_auxiliar: true,
      exib_config_auxiliar: false,
      exib_ingredientes: true,
      exib_config_ingredientes: false,
      exib_produtos: true,
      exib_config_produtos: false,


      loopIngredientes: 1,
      loopProdutos: 1,
      id_input: 100,
      id_inputIng: 100,
      ingredientesUtili: [{ nome_ingrediente: "", quantidade: 0 }], // .push({}, {})
      nomeProd_Criado: [{ nome_produto: "", quantidade_produzida: 0 }],
    }
  },
  methods: {
    MontarDados() {
      if (this.dados != null) {
        this.configDatas(this.dados.data_inicio, this.dados.data_fim)
        console.log(">>>", this.data_inicio)
      }
    },

    async configDatas(dataIni, dataFim) {

      // 2022-12-31T17:16:00.000Z
      // ['2022', '12', '31', '17:15']

      const arrayDataIni = []
      arrayDataIni.push(dataIni.slice(0, 4))
      arrayDataIni.push(dataIni.slice(5, 7))
      arrayDataIni.push(dataIni.slice(8, 10))
      arrayDataIni.push(dataIni.slice(11, 16))

      for (let i = 2; i >= 0; i--) {
        if (i != 0) {
          this.data_inicio += arrayDataIni[i] + "/"
        } else {
          this.data_inicio += arrayDataIni[i] + " " + arrayDataIni[3]
        }
      }

      const arrayDataFim = []
      arrayDataFim.push(dataFim.slice(0, 4))
      arrayDataFim.push(dataFim.slice(5, 7))
      arrayDataFim.push(dataFim.slice(8, 10))
      arrayDataFim.push(dataFim.slice(11, 16))

      for (let i = 2; i >= 0; i--) {
        if (i != 0) {
          this.data_fim += arrayDataFim[i] + "/"
        } else {
          this.data_fim += arrayDataFim[i] + " " + arrayDataIni[3]
        }
      }

    },
    // aqui na parte de sima devem ficar as funcoes que vao substituir um cartão com o nome
    // pelo input
    atualizar_data_inicio() {
      this.exibe_data_inicio = false
      this.exibe_confg_data_inicio = true
    },

    atualizar_data_fim() {
      this.exibe_data_fim = false
      this.exibe_confg_data_fim = true
    },

    atualizar_tecnicos() {
      this.exibe_tecnicos = !this.exibe_tecnicos
      this.exibe_confg_tecnicos = !this.exibe_confg_tecnicos
    },

    atualizar_auxiliar() {
      this.exibir_auxiliar = !this.exibir_auxiliar
      this.exib_config_auxiliar = !this.exib_config_auxiliar
    },

    atualizar_ingredientes() {
      this.exib_ingredientes = !this.exib_ingredientes
      this.exib_config_ingredientes = !this.exib_config_ingredientes
    },

    atualizar_produtos() {
      this.exib_produtos = !this.exib_produtos
      this.exib_config_produtos = !this.exib_config_produtos
    },

    // funcoes que pegam valores do banco e exibem na tela
    async exibirTecnicos() {
      const tec = await PegarTecnicos();
      this.nomeTec = tec.data;
    },

    async exibirAuxiliares() {
      const aux = await PegarAuxiliar()
      this.nomeAuxi = aux.data
    },

    async exibirIngredientes() {
      const ing = await PegarIngrediente()
      this.nomeIngred = ing.data
    },

    async exibirProdutos() {
      const prod = await PegarProdutos()
      this.nomeProdutos = prod.data
    },


    BotaoIncrementIngredientes() {
      this.loopIngredientes++
      // um id para os inputs de quantidade para q cada um seja unico
      this.id_inputIng++;
      this.ingredientesUtili.push({ nome_ingrediente: "", quantidade: 0 })
    },

    BotaoDecrementeIngredientes() {
      this.loopIngredientes--
      this.id_inputIng--

      this.ingredientesUtili.pop()
    },

    BotaoIncrementProdutos() {
      this.loopProdutos++;
      // um id para os inputs de quantidade para q cada um seja unico
      this.id_input++;

      this.nomeProd_Criado.push({ nome_produto: "", quantidade_produzida: 0 });
    },

    BotaoDecrementeProdutos() {
      this.loopProdutos--
      this.id_input--

      this.nomeProd_Criado.pop()
    }
  },

  mounted() {
    this.MontarDados()
    this.exibirTecnicos()
    this.exibirAuxiliares()
    this.exibirIngredientes()
    this.exibirProdutos()
  }
}
</script>


<template>
  <div>
    <form>
      <div class="row g-3 m-1">
        <div class="col-md-10 ps-4 text-center">
          <h2>ATUALIZAR REGISTRO</h2>
        </div>
      </div>

      <div class="row g-2 mt-4">
        <div class="col">
          <div class="row">
            <label for="text" class="col-md-4">n° de produçao</label>
            <div class="col-md-3">
              <input type="text" class="form-control az h-1 ab" id="text" v-model="dados.n_producao" />
            </div>
          </div>
          <div class="row mt-5">
            <label for="text" class="col-md-4"> Tecnicos de Produçao </label>

            <!-- substituir este cartão pelo botão com os selects
              com os nomes de tecnicos -->
            <div v-if="exibe_tecnicos == true">
              <div class="col-md-4">
                <div v-for="tec in this.dados.tecnico_producao" :key="tec.nome" class="form-control az ab"
                  aria-label="Recipient's username">
                  {{ tec.nome }}
                </div>
              </div>
            </div>


            <div v-if="exibe_confg_tecnicos == true">
              <div class="col-md-6">
                <button class="btn btn-secondary dropdown-toggle col-md-6 ab" type="button" data-bs-toggle="dropdown"
                  aria-expanded="false"></button>
                <ul class="dropdown-menu">
                  <div v-for="n in nomeTec" :key="n.nome" class="form-check">
                    <li>
                      <input class="form-check-input" type="checkbox" :value="n.nome" :id="n.nome"
                        v-model="nomeTecnicos" />
                    </li>
                    <label class="form-check-label" for="flexCheckChecked">{{
                      n.nome
                    }}</label>
                  </div>
                </ul>
              </div>
            </div>

            <button type="button" id="update-button-producao" class="col-2 btn botoes" @click="atualizar_tecnicos">
              Atualizar <img class="update-icon-producao" src="arrow-rotate-right-solid.svg">
            </button>

          </div>
          <div class="row mt-3">
            <label for="text" class="col-md-4">Auxiliares </label>

            <div v-if="exibir_auxiliar == true">
              <div class="col-md-4">
                <div v-for="aux in dados.auxiliar_producao" :key="aux.nome" class="form-control az ab">{{ aux.nome }}
                </div>
              </div>
            </div>

            <div v-if="exib_config_auxiliar == true">
              <div class="col-md-6">
                <button class="btn btn-secondary dropdown-toggle ab col-md-6" type="button" data-bs-toggle="dropdown"
                  aria-expanded="false"></button>
                <ul class="dropdown-menu">
                  <div v-for="n in nomeAuxi" :key="n.nome" class="form-check">
                    <li>
                      <input class="form-check-input" type="checkbox" :value="n.nome" :id="n.nome"
                        v-model="nomeAuxiliares" />
                    </li>
                    <label class="form-check-label" for="flexCheckChecked">{{
                      n.nome
                    }}</label>
                  </div>
                </ul>
              </div>

            </div>

            <button id="update-button-producao" class=" col-2 btn botoes" @click="atualizar_auxiliar" type="button">
              Atualizar
              <img class="update-icon-producao" src="arrow-rotate-right-solid.svg">
            </button>
          </div>
        </div>

        <div class="col">
          <div class="row mt-3">
            <!-- quando o usuario clica aqui... a ideia e que 
            esse cartão desapareça e no lugar dele um input pra colocar a data apareça -->
            <div @click="atualizar_data_inicio" v-if="exibe_data_inicio == true">
              <label for="text" class="col-md-4">Data de Inicio:</label>
              <div class="ab az col-md-6">
                <div class="py-2 rounded-pill"
                  style="diplay: flex; margin-top: 0.3rem; padding-left: 0.8rem; padding-right: 0.8rem;">
                  {{ data_inicio }}
                </div>
              </div>
            </div>

            <div v-if="exibe_confg_data_inicio == true">
              <label for="text" class="col-md-4">Data de inicio</label>
              <div class="col-md-6">
                <input type="datetime-local" class="form-control az ab" id="datetime-local" />
              </div>
            </div>
          </div>


          <div class="row mt-4">
            <label for="text" class="col-md-4">Data de finalização</label>

            <div @click="atualizar_data_fim" v-if="exibe_data_fim == true">
              <div class="ab az col-md-6">
                <div class="py-2 rounded-pill"
                  style="diplay: flex; margin-top: 0.3rem; padding-left: 0.8rem; padding-right: 0.8rem;">
                  {{ data_fim }}
                </div>
              </div>
            </div>

            <div v-if="exibe_confg_data_fim">
              <div class="col-md-6">
                <input type="datetime-local" class="form-control az ab" id="datetime-local" />
              </div>
            </div>



          </div>
        </div>

        <div class="row mt-5">
          <!-- ingredientes a esquerda -->

          <div class="col">
            <label for="text" class="col-md-12">Ingrendientes Ultilizados</label>
            <div class="row">
              <div class="col-md-6">


                <div v-if="exib_ingredientes == true">
                  <div class="col-md-5">
                    <div v-for="ing in dados.ingrediente_produto" :key="ing.nome" class="input-group">
                      <div class="form-control az ac">{{ ing.nome }}</div>
                      <span class="input-group-text ax">{{ ing.quantidade }} {{ ing.medicao }}</span>
                    </div>
                  </div>
                </div>

                <div v-if="exib_config_ingredientes == true">
                  <div class="az ab border border-0" id="accordionPanelsStayOpenExample">
                    <div class="accordion-item">
                      <button class="btn btn-secondary dropdown-toggle rounded-pill az col-md-12" type="button"
                        data-bs-toggle="collapse" data-bs-target="#ingredientes-collapseThree" aria-expanded="false"
                        aria-controls="ingredientes-collapseThree"></button>
                      <div id="ingredientes-collapseThree" class="accordion-collapse collapse"
                        aria-labelledby="ingredientes-collapseThree">
                        <!-- cartoes de ingrediente e quatidade -->

                        <div class="accordion-body pb-2">
                          <form class="border border-1 col-md-11 m-2 rounded-top rounded-4 pb-1"
                            v-for="i in loopIngredientes" :key="i">

                            <div class="row">
                              <select v-model="ingredientesUtili[i - 1].nome_ingrediente" class="m-3 form-select w-75"
                                aria-label="Default select example">
                                <option selected>Ingrediente utilizado</option>
                                <option v-for="item in nomeIngred" :key="item" :value="item.nome">
                                  {{ item.nome }}

                                </option>



                              </select>
                            </div>

                            <div class="row d-flex align-items-center ps-3 pb-1">
                              <input type="number" name="quantProd" class="form-control w-25" :id="id_inputIng"
                                v-model="ingredientesUtili[i - 1].quantidade" />

                              <label class="col-md-6 form-check-label" for="quantProd">Quantidade</label>
                            </div>
                          </form>

                          <div class="ab botoes col-md-4 mt-2 ms-2">
                            <button style="font-weight: 700;"
                              class="btn w-50 rounded-end rounded-5 border-0 d-flex justify-content-center"
                              type="button" @click="BotaoIncrementIngredientes">
                              +
                            </button>
                            <!-- separador -->
                            <span style="height: 100%; width: 0.2rem; background-color: #11350198;"></span>

                            <button style="font-weight: 700;"
                              class="btn w-50 rounded-start rounded-5 border-0 d-flex justify-content-center"
                              type="button" @click="BotaoDecrementeIngredientes">
                              -
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button type="button" id="update-button-producao" class=" col-md-2 btn botoes"
              @click="atualizar_ingredientes">
              Atualizar <img class="update-icon-producao" src="arrow-rotate-right-solid.svg">
            </button>
          </div>

          <!-- produtos a direita -->
          <div class="col">
            <div class="row">
              <label for="text" class="col-md-3"> Produto(os) </label>
              <div class="col-md-6">

                <div v-if="exib_produtos == true">
                  <div v-for="prod in dados.produto_producao" :key="prod.nome_produto" class="input-group">
                    <div class="form-control az ac">{{ prod.nome_produto }}</div>
                    <span class="input-group-text ax">{{ prod.quantidade_produzida }} {{ prod.medicao }}</span>
                  </div>
                </div>

                <div v-if="exib_config_produtos == true">

                  <div class="az ab border border-0" id="accordionPanelsStayOpenExample">
                    <div class="accordion-item">
                      <button class="btn btn-secondary dropdown-toggle rounded-pill az col-md-12" type="button"
                        data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false"
                        aria-controls="panelsStayOpen-collapseThree"></button>
                      <div id="panelsStayOpen-collapseThree" class="accordion-collapse collapse"
                        aria-labelledby="panelsStayOpen-headingThree">
                        <!-- cartoes de produto e quatidade -->

                        <div class="accordion-body pb-2">
                          <form class="border border-1 col-md-11 m-2 rounded-top rounded-4 pb-1"
                            v-for="i in loopProdutos" :key="i">

                            <div class="row">
                              <select v-model="nomeProd_Criado[i - 1].nome_produto" class="m-3 form-select w-75"
                                aria-label="Default select example">

                                <option selected>Selecione os produtos</option>
                                <option v-for="item in nomeProdutos" :key="item" :value="item.nome_produto">
                                  {{ item.nome_produto }}



                                </option>
                                <option>
                                  Outros
                                </option>
                              </select>

                            </div>

                            <div class="row d-flex align-items-center ps-3 pb-1">
                              <input type="number" name="quantProd" class="form-control w-25" :id="id_input"
                                v-model="nomeProd_Criado[i - 1].quantidade_produzida" />
                              <label class="col-md-6 form-check-label" for="quantProd">Quantidade</label>
                            </div>

                          </form>

                          <div class="ab botoes col-md-4 mt-2 ms-2">
                            <button style="font-weight: 700;"
                              class="btn w-50 rounded-end rounded-5 border-0 d-flex justify-content-center"
                              type="button" @click="BotaoIncrementProdutos">
                              +
                            </button>
                            <!-- separador -->
                            <span style="height: 100%; width: 0.2rem; background-color: #11350198;"></span>

                            <button style="font-weight: 700;"
                              class="btn w-50 rounded-start rounded-5 border-0 d-flex justify-content-center"
                              type="button" @click="BotaoDecrementeProdutos">
                              -
                            </button>

                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <button type="button" id="update-button-producao" class=" btn botoes ol-md-3"
                  @click="atualizar_produtos">
                  Atualizar <img class="update-icon-producao" src="arrow-rotate-right-solid.svg">
                </button>
              </div>









            </div>
          </div>
        </div>

        <div class="row">
          <div class="col">
            <div class="mb-3 mt-4">
              <label for="exampleFormControlTextarea1" class="form-label">Objetivo da Atividade</label>
              <div>
                <input type="text" class="form-control az tam ab altura" id="text" v-model="dados.objetivo" />
              </div>
            </div>

          </div>
          <div class="col">

            <div class="mb-3 mt-4">
              <label for="exampleFormControlTextarea1" class="form-label">Registro de Ocorrência</label>
              <div>
                <input type="text" class="form-control az tam ab altura" id="text"
                  v-model="dados.registro_ocorrencia" />
              </div>
            </div>


          </div>
        </div>
      </div>
    </form>
  </div>
</template>
