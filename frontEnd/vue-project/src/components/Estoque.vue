<template>
  <div>
    <div class="row g-3 m-1">
      <div class="col-md-10 ps-4 text-center">
        <h2>ESTOQUE</h2>
      </div>
    </div>

    <div class="row mt-4 mx-5">
      <!-- lado esquerdo -->
      <div class="col-md-6">

        <div v-for="ing in ingredientes" :key="ing.nome" class="col-md-7 mt-1">
          <div class="input-group">
            <div class="form-control az ac"> {{ ing.nome }}</div>
            <span class="input-group-text ax">{{ ing.quantidade_estoque }} {{ ing.medicao }}</span>
          </div>

        </div>
      </div>

      <!-- lado direito -->
      <div class="col-md-6 ">
        <div class="az ab border border-2  p-4 ">
          <h5>Atualize o Estoque</h5>
          <div>


            <!-- cartoes de ingrediente e quatidade -->

            <div class="accordion-body pb-2">
              <form class="border border-1 col-md-11 m-2 rounded-top rounded-4  p-3">

                <div class="row">
                  <select v-model="nome_ingrediente" class="m-3 form-select w-75 " aria-label="Default select example ">


                    <option>Ingredientes</option>
                    <option v-for="ing in ingredientes" :key="ing.nome" :value="ing.nome">
                      {{ ing.nome }}
                    </option>
                  </select>
                </div>

                <div class="row d-flex align-items-center ps-3 pb-1">
                  <input type="number" name="quantProd" class="form-control w-25" v-model="quantidade" />
                  <!-- acrescentar um v-if
                              para que quando o tipo de ingrediente for selecionado,
                              o nome quantidade desapareça e seja subistituido pelo
                              tipo de medida Kg, L, etc -->
                  <label class="col-md-6 form-check-label" for="quantProd">Quantidade</label>
                </div>

              </form>

              <div class="ab botoes col-md-4 mt-2 ms-2">
                <button @click="AtualizarEstoque" id="update-button-estoque"
                  class="botoes border-0 d-flex justify-content-center" type="button" style="font-weight: 700;">
                  Atualizar <img class="update-icon-estoque" src="arrow-rotate-right-solid.svg">
                </button>

              </div>
            </div>

          </div>
        </div>

        <!-- outro lado direito -->

       
        <div class="col-md-12 mt-4">
          
          <div class="az ab border border-2 p-4">
            <h5>Adicione Ingredientes</h5>
            
            <div class="row">
           
            <input class="col-md-2  ms-3 border border-1 rounded-2" type="text" name="outros" :id="id_outros_prod"
              v-model="nomeNovoingrediente" @click="apagarValueNovoIngrediente" >

              <div class="col-md-5">
            <div class="dropdown  " > 
              <button type="button" class=" btn btn-secondary dropdown-toggle " data-bs-toggle="dropdown"
                aria-expanded="false"> Und de Medida
              </button>
              <ul class="dropdown-menu pt-1 ">
                <li>
                  <input class="form-check-input" type="radio" value="Kg" id="Kg" name="medicao" v-model="medicao">
                  <label class="form-check-label ps-2" for="flexCheckChecked">Kg</label>
                </li>
                <li>
                  <input class="form-check-input" type="radio" value="L" id="L" name="medicao" v-model="medicao">
                  <label class="form-check-label ps-2" for="flexCheckChecked">L</label>
                </li>
                <li>
                  <input class="form-check-input" type="radio" value="unidade" id="unidade" name="medicao" v-model="medicao">
                  <label class="form-check-label ps-2" for="flexCheckChecked">unidade</label>
                </li>
              </ul>
              
            </div>
          
            </div>
          
          </div>
         
            <div class="ab botoes col-md-4 mt-3 ms-2 ">
            <button @click="insertNovoIngrediente" style="font-weight: 700;" type="button"
              class="botoes justify-content-center d-flex border-0 rounded-2 "> Adicionar +</button>
            </div>
            
          </div>
        </div>

    
        </div>
      
      </div>

    </div>
  
  
  
</template>

<script>

import {
  PegarIngrediente,
  atualizarEstoque,
  insertIngrediente
} from '../axios';


export default {
  name: "Estoque",

  data() {
    return {
      ingredientes: "",
      nome_ingrediente: "",
      quantidade: "",

      nomeNovoingrediente: 'Outros',
      medicao: ''
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
      await this.getIngredientes()
    },

    async insertNovoIngrediente() {
      await insertIngrediente(this.nomeNovoingrediente, this.medicao)
      await this.getIngredientes()
    },

    apagarValueNovoIngrediente() {
      this.nomeNovoingrediente = ''
    }
  },

  mounted() {
    this.getIngredientes()
  }
}
</script> 
