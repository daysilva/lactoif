<template>
    <div>
        <div class="row g-3 m-1">
        <div class="col-md-10 ps-4 text-center">
          <h2>ESTOQUE</h2>
        </div>
      </div>

      <div class="row mt-4 mx-5">
        <!-- lado direito -->
        <div class="col-md-6">
            <div
            v-for="ing in ingredientes"
            :key="ing.nome"
            class="col-md-5">
                <div
                 class="input-group">
                  <div class="form-control az ac">{{ ing.nome }}</div>
                  <span class="input-group-text ax">{{ ing.quantidade_estoque }} {{ ing.medicao }}</span>
                </div>
  
              </div>
        </div>

        <!-- lado esquerdo -->
        <div class="col-md-6">
            <div class="az ab border border-0" id="accordionPanelsStayOpenExample">
                  <div class="accordion-item">
                    <button
                    
                        class="btn btn-secondary dropdown-toggle rounded-pill az col-md-12 " 
                        type="button"
                        
                        data-bs-toggle="collapse"
                        data-bs-target="#ingredientes-collapseThree"
                        aria-expanded="false"
                        aria-controls="ingredientes-collapseThree"
                      > </button>
                    <div
                      id="ingredientes-collapseThree"
                      class="accordion-collapse collapse"
                      aria-labelledby="ingredientes-collapseThree"
                    >
                      <!-- cartoes de ingrediente e quatidade -->

                      <div class="accordion-body pb-2">
                          <form class="border border-1 col-md-11 m-2 rounded-top rounded-4 pb-1" 
                          >

                            <div class="row">
                              <select
                               v-model="nome_ingrediente"
                                class="m-3 form-select w-75"
                                aria-label="Default select example"
                              >
                              <option>Ingredientes</option>
                                <option
                                  v-for="ing in ingredientes"
                                  :key="ing.nome"
                                  :value="ing.nome"
                                >
                                {{ ing.nome }}                             
                                </option>
                              </select>
                            </div>

                            <div class="row d-flex align-items-center ps-3 pb-1">
                              <input
                                type="number"
                                name="quantProd"
                                class="form-control w-25"
                                v-model="quantidade"
                            
                              />
                              <!-- acrescentar um v-if
                              para que quando o tipo de ingrediente for selecionado,
                              o nome quantidade desapareça e seja subistituido pelo
                              tipo de medida Kg, L, etc -->
                              <label class="col-md-6 form-check-label" for="quantProd"
                                >Quantidade</label
                              >
                            </div>

                          </form>

                            <div class="ab botoes col-md-4 mt-2 ms-2">
                              <button
                               @click="AtualizarEstoque"
                                class="botoes border-0 d-flex justify-content-center" 
                                type="button">
                                  atualizar
                                </button>
                                
                            </div>
                        </div>
                    </div>
                  </div>
                </div>
        </div>
      </div>
    </div>
</template>

<script>

import {PegarIngrediente, atualizarEstoque} from '../axios';


export default {
    name: "Estoque",

    data() {
      return {
        ingredientes: "",
        nome_ingrediente: "",
        quantidade: ""
      }
    },

    methods: {
      async getIngredientes() {
        const x = await PegarIngrediente()
        this.ingredientes = x.data
        console.log(this.ingredientes)
      },

      async AtualizarEstoque() {
        await atualizarEstoque(this.nome_ingrediente, this.quantidade)
        this.getIngredientes()
      }
    },

    mounted() {
      this.getIngredientes()
    }
}
</script> 