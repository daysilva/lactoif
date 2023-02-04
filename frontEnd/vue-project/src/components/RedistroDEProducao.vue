<script>
import { PegarUltimoRegistro } from "../axios"


export default {
  name: "RegistroDeProducao",

  data() {
    return {
      dados: "",

      // armazenar as datas q vem do back e ajusta-las
      data_inicio: "",
      data_fim: ""
    }
  },

  methods: {
    async pegarUltimoRegistro() {
      const x = await PegarUltimoRegistro()
      this.dados = x.data
      console.log(this.dados)

      this.configDatas(this.dados.data_inicio, this.dados.data_fim)

    },

    async configDatas(dataIni, dataFim) {
      // 2022-12-31T17:16:00.000Z
      // ['2022', '12', '31', '17:15']


      const horaCertaInicio = new Date(dataIni);

      horaCertaInicio.setHours(horaCertaInicio.getHours() - 3);
      const x = horaCertaInicio.toISOString()

      const arrayDataIni = []
      arrayDataIni.push(x.slice(0, 4))
      arrayDataIni.push(x.slice(5, 7))
      arrayDataIni.push(x.slice(8, 10))
      arrayDataIni.push(x.slice(11, 16))


      for (let i = 2; i >= 0; i--) {
        if (i != 0) {
          this.data_inicio += arrayDataIni[i] + "/"
        } else {
          this.data_inicio += arrayDataIni[i] + " " + arrayDataIni[3]
        }
      }

      const arrayDataFim = []

      const horaCertaFim = new Date(dataFim);

      horaCertaFim.setHours(horaCertaFim.getHours() - 3);
      const y = horaCertaFim.toISOString()

      // console.log(date);

      arrayDataFim.push(y.slice(0, 4))
      arrayDataFim.push(y.slice(5, 7))
      arrayDataFim.push(y.slice(8, 10))
      arrayDataFim.push(y.slice(11, 16))

      //console.log(arrayDataFim);

      // const temp3 = arrayDataFim[3].slice(0, 2)

      // const temp4 = arrayDataFim[3].slice(2, 6)

      // console.log(temp3-3);
      // console.log(temp4);

      // const hora_certa2=(temp3-3 + temp4)

      // arrayDataFim[3]=hora_certa2

      for (let i = 2; i >= 0; i--) {
        if (i != 0) {
          this.data_fim += arrayDataFim[i] + "/"
        } else {
          this.data_fim += arrayDataFim[i] + " " + arrayDataFim[3]
        }
      }

    }
  },

  mounted() {
    this.pegarUltimoRegistro()
  }
};


</script>

<template>
  <div>
    <form>
      <div class="row g-3 m-1">
        <div class="col-md-11 ps-5 text-center">
          <h2>REGISTRO DE PRODUÇÃO</h2>
        </div>
      </div>
      <div class="m-5">
        <div class="row">
          <div class="col-m-5 col-md-2">
            <div class="for-text">Produção N°:</div>
          </div>

          <div class="ab az col-md-1">
            <div class="py-1 rounded-pill"
              style="diplay: flex; margin-top: 0.3rem; padding-left: 0.8rem; padding-right: 0.8rem;">
              {{ dados.n_producao }}
            </div>
          </div>
        </div>
        <div class="row">
          <div>
            <label for="text" class="col-md-4">Data de Inicio:</label>
            <div class="ab az col-md-2">
              <div class="py-2 rounded-pill"
                style="diplay: flex; margin-top: 0.3rem; padding-left: 0.8rem; padding-right: 0.8rem;">
                {{ data_inicio }}
              </div>
            </div>
          </div>
        </div>
        <div class="row mt-1">
          <div>
            <label for="text" class="col-md-4">Data de Finalização:</label>
            <div class="ab az col-md-2">
              <div class="py-2 rounded-pill"
                style="diplay: flex; margin-top: 0.3rem; padding-left: 0.8rem; padding-right: 0.8rem;">
                {{ data_fim }}
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <!-- esquerda -->
          <div class="col">
            <div class="row" style="diplay: flex; padding-top: 4rem">
              <label for="text" class="col-md-12">Ingrendientes Ultilizados:</label>

              <div class="col-md-7 mt-1">
                <div v-for="ing in dados.ingrediente_produto" :key="ing.nome" class="input-group mt-1">
                  <div class="form-control az ac">{{ ing.nome }}</div>
                  <span class="input-group-text ax">{{ ing.quantidade }} {{ ing.medicao }}</span>
                </div>

              </div>
            </div>
          </div>
          <!-- direita -->
          <div class="col">
            <div class="row" style="diplay: flex; padding-top: 4rem">
              <label for="text" class="col-md-12">Produto(s) Produzido(s):</label>

              <div class="col-md-7 ">

                <div v-for="prod in dados.produto_producao" :key="prod.nome_produto " class="input-group mt-1">
                  <div class="form-control az ac mt-">{{ prod.nome_produto }}</div>
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
              <label for="text" class="col-md-12">Técnico(os) Responsável(eis):</label>

              <div class="col-md-7 ">

                <div v-for="tec in dados.tecnico_producao" :key="tec.nome" class="form-control az ab  mt-1"
                  aria-label="Recipient's username">
                  {{ tec.nome }}
                </div>

              </div>
            </div>
          </div>

          <!-- direito -->
          <div class="col">
            <div class="row mt-5">
              <label for="text" class="col-md-12">Auxiliar(es) de Produção:</label>

              <div class="col-md-7 mt-1">
                <div v-for="aux in dados.auxiliar_producao" :key="aux.nome" class="form-control az ab mt-1">{{ aux.nome }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <!-- esquerdo -->
          <div class="col">
            <div class="row mt-3">
              <div class="mb-3 mt-4">
                <label for="exampleFormControlTextarea1" class="form-label">Objetivo da Atividade:</label>
                <div class="form-control az tam ab altura ">{{ dados.objetivo }}
                </div>
              </div>
            </div>
          </div>
          <!-- direito -->
          <div class="col">
            <div class="row mt-3">
              <div class="mb-3 mt-4">
                <label for="exampleFormControlTextarea1" class="form-label">Registro de Ocorrência:</label>
                <div class="form-control az tam ab altura  ">{{ dados.registro_ocorrencia }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
