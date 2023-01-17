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
              <input type="text" class="form-control az h-1 ab" id="text" v-model="n_producao" />
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
              <ul class="dropdown-menu">
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
                <div class="az ab border border-0" id="accordionPanelsStayOpenExample">
                  <div class="accordion-item">
                      <button
                        class="btn btn-secondary dropdown-toggle rounded-pill az col-md-12"
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
                          <form class="border border-1 col-md-11 m-2 rounded-top rounded-4 pb-1" 
                          v-for="i in loopIngredientes" :key="i">

                            <div class="row">
                              <select
                                v-model="ingredientesUtili[i - 1].nome_ingrediente"
                                class="m-3 form-select w-75"
                                aria-label="Default select example"
                              >
                                <option selected>Ingrediente utilizado</option>
                                <option
                                  v-for="item in nomeIngred"
                                  :key="item"
                                  :value="item.nome"
                                >
                                  {{ item.nome}}
                                  
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
                              <label class="col-md-6 form-check-label" for="quantProd"
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
                                style="font-weight: 700;" 
                                class="btn w-50 rounded-end rounded-5 border-0 d-flex justify-content-center" 
                                type="button"
                                @click="BotaoIncrementIngredientes">
                                  +
                                </button>
                                <!-- separador -->
                                <span style="height: 100%; width: 0.2rem; background-color: #11350198;"></span>

                                <button
                                style="font-weight: 700;" 
                                class="btn w-50 rounded-start rounded-5 border-0 d-flex justify-content-center" 
                                type="button"
                                @click="BotaoDecrementeIngredientes">
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
                <div class="col-md-6">
                  <div class="az ab border border-0" id="accordionPanelsStayOpenExample">
                    <div class="accordion-item">
                        <button
                          class="btn btn-secondary dropdown-toggle rounded-pill az col-md-12"
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
                          <form class="border border-1 col-md-11 m-2 rounded-top rounded-4 pb-1"
                        
                          v-for="i in loopProdutos" :key="i">

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
                               <option>
                                Outros
                               </option>
                            </select>
                            
                          </div>
                            
                            <div class="row d-flex align-items-center ps-3 pb-1">
                              <input
                                type="number"
                                name="quantProd"
                                class="form-control w-25"
                                :id="id_input"
                                v-model="nomeProd_Criado[i - 1].quantidade_produzida"
                              />
                              <label class="col-md-6 form-check-label" for="quantProd"
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
                              style="font-weight: 700;" 
                              class="btn w-50 rounded-end rounded-5 border-0 d-flex justify-content-center" 
                              type="button"
                              @click="BotaoIncrementProdutos">
                                +
                              </button>
                              <!-- separador -->
                              <span style="height: 100%; width: 0.2rem; background-color: #11350198;"></span>

                              <button
                              style="font-weight: 700;" 
                              class="btn w-50 rounded-start rounded-5 border-0 d-flex justify-content-center" 
                              type="button"
                              @click="BotaoDecrementeProdutos"
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
    </div>
</template>

<script>
   export default {
    name: "UpdateRegistro",

    data() {
        return {
            dados: ""
        }
    },

    methods: {

    }
   }
</script>