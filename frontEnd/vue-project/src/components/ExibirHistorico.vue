<template>
<div>
    <form class="mt-5 border border-3 rounded-4">
      <div class="d-flex justify-content-end">
        <button
        @click="$emit('fecharHistorico')"
         type="button" class="btn btn-close btn-outline-primary py-3 px-5" 
         aria-label="Close">
        </button>
      </div>
      <div class="row g-3 m-1">
      </div>
      <div class="m-5">
        <div class="row">
          <div class="col-m-5 col-md-2">
            <div class="for-text">Produção n°</div>
          </div>

          <div class="ab az col-md-1">
            <div
              class="py-1 rounded-pill" style="diplay: flex; margin-top: 0.3rem; padding-left: 0.8rem; padding-right: 0.8rem;">
              {{ dados.n_producao }}
            </div>
          </div>
        </div>
        <div class="row">
          <div>
            <label for="text" class="col-md-4">Data de Inicio:</label>
            <div class="ab az col-md-2">
              <div
                class="py-2 rounded-pill" style="diplay: flex; margin-top: 0.3rem; padding-left: 0.8rem; padding-right: 0.8rem;">
                {{ data_inicio }}
              </div>
            </div>
          </div>
        </div>
        <div class="row mt-1">
          <div>
            <label for="text" class="col-md-4">Data de Finalização:</label>
            <div class="ab az col-md-2">
              <div
                class="py-2 rounded-pill" style="diplay: flex; margin-top: 0.3rem; padding-left: 0.8rem; padding-right: 0.8rem;">
                {{ data_fim }}
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <!-- esquerda -->
          <div class="col">
            <div class="row" style="diplay: flex; padding-top: 4rem">
              <label for="text" class="col-md-12">Ingrendientes Ultilizados</label>

              <div class="col-md-5">
                <div
                v-for="ingrd in dados.ingrediente_produto"
                :key="ingrd.nome"
                 class="input-group">
                  <div class="form-control az ac">{{ ingrd.nome }}</div>
                  <span class="input-group-text ax">{{ ingrd.quantidade }} {{ ingrd.medicao }}</span>
                </div>
  
              </div>
            </div>
          </div>
          <!-- direita -->
          <div class="col">
            <div class="row" style="diplay: flex; padding-top: 4rem">
              <label for="text" class="col-md-12">Produto(s) Produzido(s)</label>

              <div class="col-md-5">

                <div
                v-for="prod in dados.produto_producao"
                :key="prod.nome_produto"
                class="input-group">
                  <div class="form-control az ac">{{ prod.nome_produto }}</div>
                  <span class="input-group-text ax">{{ prod.quantidade_produzida }} {{ prod.medicao }}</span>
                </div>
                
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          
          <!-- esquerdo -->
          <div class="col">
            <div class="row mt-5">
              <label for="text" class="col-md-12">Tecnico(os) Responsável(eis)</label>

              <div class="col-md-4">

                <div
                v-for="tec in dados.tecnico_producao"
                :key="tec.nome"
                class="form-control az ab" aria-label="Recipient's username">
                  {{ tec.nome }}
                </div>
                
              </div>
            </div>
          </div>

          <!-- direito -->
          <div class="col">
            <div class="row mt-5">
              <label for="text" class="col-md-12">Auxiliar(es) de Produção</label>

              <div class="col-md-4">
                <div
                v-for="aux in dados.auxiliar_producao"
                :key="aux.nome"
                class="form-control az ab">{{ aux.nome }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <!-- esquerdo -->
          <div class="col">
            <div class="row mt-3">
              <div class="mb-3 mt-4">
                <label for="exampleFormControlTextarea1" class="form-label"
                  >Objetivo da Atividade</label
                >
                <div
                  class="form-control az tam ab altura">
                  {{ dados.objetivo }}
                </div>
              </div>
            </div>
          </div>
          <!-- direito -->
          <div class="col">
            <div class="row mt-3">
              <div class="mb-3 mt-4">
                <label for="exampleFormControlTextarea1" class="form-label"
                  >Registro de Ocorrência</label
                >
                <div
                  class="form-control az tam ab altura">
                  {{ dados.registro_ocorrencia }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <button
      class=" btn botoes"
      @click="$emit('updateRegistro')"
       type="button">EDITAR</button>
    </form>
  </div>
</template>

<script>


    export default {
        name: "ExibirHistorico",
        emits: ['fecharHistorico', "updateRegistro"],
        props: {
            dados: Object
        },


        data() {
            return {
              valores: "",
              data_inicio: "",
              data_fim: ""
            }
        },

        methods: {
        exibir() {
          console.log("opa")
        },

        MontarDados(){
          if (this.dados != null) {
            this.configDatas(this.dados.data_inicio, this.dados.data_fim)
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
  
    }
   
        },

        mounted() {
         this.MontarDados()
        },
    }
</script>