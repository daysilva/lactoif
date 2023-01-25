<script>
import MensagemNotificacao from "./MensagemNotificacao.vue";

import {
  PegarTecnicos,
  PegarAuxiliar,
  PegarIngrediente,
  PegarProdutos,
  RegistrarProducao,
  IsertAuxiliar,
  InsertProduto,
} from "../axios";

export default {
  name: "RegistrarProdução",
  components: {
    MensagemNotificacao,
  },

  data() {
    return {
      nomeTec: "",
      nomeAuxi: "",
      nomeIngred: "",
      nomeProdutos: "",

      msgErro: "",
      ativo: false,
      sucesso: null,

      // variaveis que vao pegar os valores selecionados e mandar para
      // a funcao regidtrarProducao()

      loopProdutos: 1,
      loopIngredientes: 1,
      id_input: 100,
      id_inputIng: 100,
      id_outros_prod: 150,

      // .push({"nome_produto": "iorgute", "quantidade_produzida": 2})
      nomeProd_Criado: [{ nome_produto: "", quantidade_produzida: 0 }],
      n_producao: "",
      data_inicio: "",
      novaDataInicio: "",

      nomeNovoAuxiliar: "outros",
      nomeNovoProduto: "outros",
      medicao: "",

      data_fim: "",
      novaDataFim: "",

      regist_ocorren: null,
      objetivo: "",
      nomeAuxiliares: [],
      nomeTecnicos: [],
      ingredientesUtili: [{ nome_ingrediente: "", quantidade: 0 }], // .push({}, {})
    };
  },

  methods: {
    async exibirTecnicos() {
      const tec = await PegarTecnicos();
      this.nomeTec = tec.data;
    },

    async exibirAuxiliares() {
      const auxi = await PegarAuxiliar();
      this.nomeAuxi = auxi.data;
    },

    async exibirIngredientes() {
      const ingre = await PegarIngrediente();
      this.nomeIngred = ingre.data;
      console.log(this.nomeIngred);
    },

    async exibirProdutos() {
      // vai vir o nome e id
      const prod = await PegarProdutos();
      this.nomeProdutos = prod.data;
    },

    //    produto_criado, n_producao, data_inicio, data_fim,
    //   regristro_ocorrencia, objetivo, nomeAuxiliar, nome_tecnico, ingredientesUtili

    async registrarProducao() {
      if (
        this.nomeProd_Criado[0].nome_produto == "" ||
        this.nomeProd_Criado[0].quantidade_produzida == 0 ||
        this.n_producao == "" ||
        this.data_inicio == "" ||
        this.data_fim == "" ||
        this.objetivo == "" ||
        this.nomeAuxiliares.length == 0 ||
        this.nomeTecnicos.length == 0 ||
        this.ingredientesUtili[0].nome_ingrediente == "" ||
        this.ingredientesUtili[0].quantidade == 0
      ) {
        this.msgErro = "Atenção! Preencha todos os campos!";
        this.ativo = true;
        this.sucesso = false;
        setTimeout(() => {
          this.ativo = false;
          this.msgErro = "";
        }, 3000);
      } else {
        this.ativo = true;
        this.msgErro = "cadastrado com sucesso!";
        this.sucesso = true;
        setTimeout(() => {
          this.ativo = false;
          this.msgErro = "";
        }, 3000);

        const dados = {
          nomeProd_Criado: this.nomeProd_Criado, // [{nome quant} {nome quant}]
          n_producao: this.n_producao, // ex. 1/2022
          data_inicio: this.data_inicio.toString().replace("T", " "),
          data_fim: this.data_fim.toString().replace("T", " "),
          regristro_ocorrencia: this.regist_ocorren, // pode ser null
          objetivo: this.objetivo, // talvez possa ser null
          nomeAuxiliares: this.nomeAuxiliares, // ["Allan", "Denys", "Paulo"]
          nome_tecnicos: this.nomeTecnicos, // ["Ramon", "Mayomir", "Paulo"]
          ingredientesUtili: this.ingredientesUtili, // [{nome quant}, {nome quant}]
        };
        RegistrarProducao(dados);
      }
    },

    // toda vez que alguem selecinonar o nome de um produto
    // essa fucao pegará o valor e dará um push em nomeProd_Criado
    Push_nomeProd_Criado() {
      console.log(this.nomeProd_Criado);
      console.log(this.n_producao);
      console.log(this.data_inicio.toString().replace("T", " "));
      console.log(this.data_fim.toString().replace("T", " "));
      console.log(this.regist_ocorren);
      console.log(this.objetivo);
      console.log(this.nomeAuxiliares);
      console.log(this.nomeTecnicos);
      console.log(this.ingredientesUtili);
    },

    BotaoIncrementProdutos() {
      this.loopProdutos++;
      // um id para os inputs de quantidade para q cada um seja unico
      this.id_input++;

      this.id_outros_prod++;

      this.nomeProd_Criado.push({ nome_produto: "", quantidade_produzida: 0 });
    },

    BotaoDecrementeProdutos() {
      this.loopProdutos--;
      this.id_input--;

      this.nomeProd_Criado.pop();
    },

    BotaoIncrementIngredientes() {
      this.loopIngredientes++;
      // um id para os inputs de quantidade para q cada um seja unico
      this.id_inputIng++;
      this.ingredientesUtili.push({ nome_ingrediente: "", quantidade: 0 });
    },

    BotaoDecrementeIngredientes() {
      this.loopIngredientes--;
      this.id_inputIng--;

      this.ingredientesUtili.pop();
    },

    async insertOutrosAuxiliares() {
      await IsertAuxiliar(this.nomeNovoAuxiliar);
      this.nomeAuxiliares.push(this.nomeNovoAuxiliar);
      this.nomeNovoAuxiliar = "outros";
    },

    async insertOutrosProdutos() {
      await InsertProduto(this.nomeNovoProduto, this.medicao);
      this.nomeProd_Criado[this.nomeProd_Criado.length - 1].nome_produto =
        this.nomeNovoProduto;
      this.nomeNovoProduto = "outros";
    },

    apagarValueOutrosProdutos() {
      this.nomeNovoProduto = "";
    },

    apagarValueOutrosAuxiliares() {
      this.nomeNovoAuxiliar = "";
    },
  },
  mounted() {
    this.exibirTecnicos();
    this.exibirAuxiliares();
    this.exibirIngredientes();
    this.exibirProdutos();
  },
};
</script>

<template>
  <div class="mx-5">
    <MensagemNotificacao :msg="msgErro" :isActive="ativo" :sucesso="sucesso" />

    <form>
      <div class="row g-3 m-1">
        <div class="col-md-10 ps-4 text-center">
          <h2>REGISTRAR PRODUÇÃO</h2>
        </div>
      </div>

      <div class="row g-2 mt-4">
        <div class="col">
          <div class="row">
            <label for="text" class="col-md-4">n° de produçao</label>
            <div class="col-md-3">
              <input
                type="text"
                class="form-control az h-1 ab"
                id="text"
                v-model="n_producao"
              />
            </div>
          </div>
          <div class="row mt-5">
            <label for="text" class="col-md-4"> Tecnicos de Produçao </label>
            <div class="col-md-6">
              <button
                class="btn btn-secondary dropdown-toggle col-md-6 ab"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              ></button>
              <ul class="dropdown-menu">
                <div v-for="n in nomeTec" :key="n.nome" class="form-check">
                  <li>
                    <input
                      class="form-check-input"
                      type="checkbox"
                      :value="n.nome"
                      :id="n.nome"
                      v-model="nomeTecnicos"
                    />
                  </li>
                  <label class="form-check-label" for="flexCheckChecked">{{
                    n.nome
                  }}</label>
                </div>
              </ul>
            </div>
          </div>
          <div class="row mt-3">
            <label for="text" class="col-md-4">Auxiliares </label>
            <div class="col-md-6">
              <button
                class="btn btn-secondary dropdown-toggle ab col-md-6"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              ></button>
              <ul class="dropdown-menu ps-2">
                <div v-for="n in nomeAuxi" :key="n.nome" class="form-check">
                  <li>
                    <input
                      class="form-check-input"
                      type="checkbox"
                      :value="n.nome"
                      :id="n.nome"
                      v-model="nomeAuxiliares"
                    />
                  </li>
                  <label class="form-check-label" for="flexCheckChecked">{{
                    n.nome
                  }}</label>
                </div>
                <div class="row grid gap-2 column-gap-1">
                  <input
                    class="col-md-6 ms-3 border border-1 rounded-2"
                    type="text"
                    name="outros"
                    id="outros"
                    v-model="nomeNovoAuxiliar"
                    @click="apagarValueOutrosAuxiliares"
                  />
                  <button
                    @click="insertOutrosAuxiliares"
                    style="font-weight: 700"
                    type="button"
                    class="
                      col-md-2
                      botoes
                      justify-content-center
                      d-flex
                      border-0
                      rounded-2
                    "
                  >
                    +
                  </button>
                </div>
              </ul>
            </div>
          </div>
        </div>

        <div class="col">
          <div class="row mt-3">
            <label for="text" class="col-md-4">Data de inicio</label>
            <div class="col-md-6">
              <input
                type="datetime-local"
                class="form-control az ab"
                id="datetime-local"
                v-model="data_inicio"
              />
            </div>
          </div>

          <div class="row">
            <div class="row mt-4">
              <label for="text" class="col-md-4">Data de finalização</label>
              <div class="col-md-6">
                <input
                  type="datetime-local"
                  class="form-control az ab"
                  id="datetime-local"
                  v-model="data_fim"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="row mt-5">
          <!-- ingredientes a esquerda -->
          <div class="col">
            <div class="row">
              <label for="text" class="col-md-3"> Ingredientes </label>
              <div class="col-md-6">
                <div
                  class="az ab border border-0"
                  id="accordionPanelsStayOpenExample"
                >
                  <div class="accordion-item">
                    <button
                      class="
                        btn btn-secondary
                        dropdown-toggle
                        rounded-pill
                        az
                        col-md-12
                      "
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#ingredientes-collapseThree"
                      aria-expanded="false"
                      aria-controls="ingredientes-collapseThree"
                    ></button>
                    <div
                      id="ingredientes-collapseThree"
                      class="accordion-collapse collapse"
                      aria-labelledby="ingredientes-collapseThree"
                    >
                      <!-- cartoes de ingrediente e quatidade -->

                      <div class="accordion-body pb-2">
                        <form
                          class="
                            border border-1
                            col-md-11
                            m-2
                            rounded-top rounded-4
                            pb-1
                          "
                          v-for="i in loopIngredientes"
                          :key="i"
                        >
                          <div class="row">
                            <select
                              v-model="
                                ingredientesUtili[i - 1].nome_ingrediente
                              "
                              class="m-3 form-select w-75"
                              aria-label="Default select example"
                            >
                              <option selected>Ingrediente utilizado</option>
                              <option
                                v-for="item in nomeIngred"
                                :key="item"
                                :value="item.nome"
                              >
                                {{ item.nome }}
                              </option>
                            </select>
                          </div>

                          <div class="row d-flex align-items-center ps-3 pb-1">
                            <input
                              type="number"
                              name="quantProd"
                              class="form-control w-25"
                              :id="id_inputIng"
                              v-model="ingredientesUtili[i - 1].quantidade"
                            />
                            <!-- acrescentar um v-if
                              para que quando o tipo de ingrediente for selecionado,
                              o nome quantidade desapareça e seja subistituido pelo
                              tipo de medida Kg, L, etc -->
                            <label
                              class="col-md-6 form-check-label"
                              for="quantProd"
                              >Quantidade</label
                            >
                          </div>

                          <!-- <button
                              type="button"
                              class="mt-2 ms-2 btn btn-primary"
                              @click="BotaoIncrementIngredientes"
                              >
                              + adicinar ingrediente
                            </button> -->
                        </form>

                        <div class="ab botoes col-md-4 mt-2 ms-2">
                          <button
                            style="font-weight: 700"
                            class="
                              btn
                              w-50
                              rounded-end rounded-5
                              border-0
                              d-flex
                              justify-content-center
                            "
                            type="button"
                            @click="BotaoIncrementIngredientes"
                          >
                            +
                          </button>
                          <!-- separador -->
                          <span
                            style="
                              height: 100%;
                              width: 0.2rem;
                              background-color: #11350198;
                            "
                          ></span>

                          <button
                            style="font-weight: 700"
                            class="
                              btn
                              w-50
                              rounded-start rounded-5
                              border-0
                              d-flex
                              justify-content-center
                            "
                            type="button"
                            @click="BotaoDecrementeIngredientes"
                          >
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
          <!-- produtos a direita -->
          <div class="col">
            <div class="row">
              <label for="text" class="col-md-3"> Produto(os) </label>
              <div class="col-md-8">
                <div
                  class="az ab border border-0"
                  id="accordionPanelsStayOpenExample"
                >
                  <div class="accordion-item">
                    <button
                      class="
                        btn btn-secondary
                        dropdown-toggle
                        rounded-pill
                        az
                        col-md-12
                      "
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#panelsStayOpen-collapseThree"
                      aria-expanded="false"
                      aria-controls="panelsStayOpen-collapseThree"
                    ></button>
                    <div
                      id="panelsStayOpen-collapseThree"
                      class="accordion-collapse collapse"
                      aria-labelledby="panelsStayOpen-headingThree"
                    >
                      <!-- cartoes de produto e quatidade -->

                      <div class="accordion-body pb-2">
                        <form
                          class="
                            border border-1
                            col-md-11
                            m-2
                            rounded-top rounded-4
                            pb-1
                          "
                          v-for="i in loopProdutos"
                          :key="i"
                        >
                          <div class="row">
                            <select
                              v-model="nomeProd_Criado[i - 1].nome_produto"
                              class="m-3 form-select w-75"
                              aria-label="Default select example"
                            >
                              <option selected>Selecione os produtos</option>
                              <option
                                v-for="item in nomeProdutos"
                                :key="item"
                                :value="item.nome_produto"
                              >
                                {{ item.nome_produto }}
                              </option>
                            </select>
                          </div>

                          <div
                            class="row d-flex align-items-center ps-3 pb-1 mt-2"
                          >
                            <input
                              type="number"
                              name="quantProd"
                              class="form-control w-25"
                              :id="id_input"
                              v-model="
                                nomeProd_Criado[i - 1].quantidade_produzida
                              "
                            />
                            <label
                              class="col-md-6 form-check-label"
                              for="quantProd"
                              >Quantidade</label
                            >
                          </div>
                        </form>

                        <!-- <button
                            type="button"
                            class="mt-2 btn btn-primary"
                            @click="BotaoIncrementProdutos"
                          >
                            + adicinar produto
                          </button> -->
                        <div class="ab botoes col-md-4 mt-2 ms-2">
                          <button
                            style="font-weight: 700"
                            class="
                              btn
                              w-50
                              rounded-end rounded-5
                              border-0
                              d-flex
                              justify-content-center
                            "
                            type="button"
                            @click="BotaoIncrementProdutos"
                          >
                            +
                          </button>
                          <!-- separador -->
                          <span
                            style="
                              height: 100%;
                              width: 0.2rem;
                              background-color: #11350198;
                            "
                          ></span>

                          <button
                            style="font-weight: 700"
                            class="
                              btn
                              w-50
                              rounded-start rounded-5
                              border-0
                              d-flex
                              justify-content-center
                            "
                            type="button"
                            @click="BotaoDecrementeProdutos"
                          >
                            -
                          </button>
                        </div>

                        <!--  -->
                        <div class="row grid gap-0 column-gap-0 mt-1">
                          <input
                            class="col-lg-3 ms-3 border border-1 rounded-2"
                            type="text"
                            name="outros"
                            :id="id_outros_prod"
                            v-model="nomeNovoProduto"
                            @click="apagarValueOutrosProdutos"
                          />

                          <div class="dropdown col-lg-2">
                            <button
                              type="button"
                              class="btn btn-secondary dropdown-toggle"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            ></button>
                            <ul class="dropdown-menu pt-5">
                              <li>
                                <input
                                  class="form-check-input"
                                  type="checkbox"
                                  value="Kg"
                                  id="Kg"
                                  name="Kg"
                                  v-model="medicao"
                                />
                                <label
                                  class="form-check-label ps-2"
                                  for="flexCheckChecked"
                                  >Kg</label
                                >
                              </li>
                              <li>
                                <input
                                  class="form-check-input"
                                  type="checkbox"
                                  value="L"
                                  id="L"
                                  name=""
                                  v-model="medicao"
                                />
                                <label
                                  class="form-check-label ps-2"
                                  for="flexCheckChecked"
                                  >L</label
                                >
                              </li>
                              <li>
                                <input
                                  class="form-check-input"
                                  type="checkbox"
                                  value="unidade"
                                  id="unidade"
                                  name=""
                                  v-model="medicao"
                                />
                                <label
                                  class="form-check-label ps-2"
                                  for="flexCheckChecked"
                                  >unidade</label
                                >
                              </li>
                            </ul>
                          </div>
                          <button
                            @click="insertOutrosProdutos"
                            style="font-weight: 700"
                            type="button"
                            class="
                              col-lg-2
                              botoes
                              justify-content-center
                              d-flex
                              border-0
                              rounded-2
                            "
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col">
            <div class="mb-3 mt-5">
              <label for="exampleFormControlTextarea1" class="form-label"
                >Objetivo da Atividade:</label
              >
              <textarea
                class="form-control az tam ab"
                id="exampleFormControlTextarea1"
                rows="3"
                v-model="objetivo"
              ></textarea>
            </div>
          </div>
          <div class="col">
            <div class="mb-3 mt-5">
              <label for="exampleFormControlTextarea1" class="form-label"
                >Registro de Ocorrencia:</label
              >
              <textarea
                class="form-control az tam ab"
                id="exampleFormControlTextarea1"
                rows="3"
                v-model="regist_ocorren"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </form>
    <div class="mb-4 text-end mt-5">
      <button @click="registrarProducao" class="btn btn-primary" type="submit">
        Cadastrar
      </button>
    </div>
  </div>
</template>
