<script>
import { getHistorico, pegarNProducao, pesquisarHistorico } from '../axios';
import ExibirHistorico from './ExibirHistorico.vue'
import UpdateRegistro from './UpdateRegistro.vue';

export default {
  name: "Historico",
  components: {
    ExibirHistorico,
    UpdateRegistro
  },

  data() {
    return {
      dados: "",
      nome: "",
      h: false,
      botao: true,
      update_registro: false,
      query: "",
      exibir_registro: false

    }
  },

  methods: {
    async GetHistorico(n_producao) {
      const n_prod = n_producao.replace("/", "-")
      const x = await getHistorico(n_prod)
      this.dados = x.data
    },

    async resultadoHistorico() {
      this.botao = false
      this.exibir_registro = true
      await this.GetHistorico(this.query)
    },

    async pegarnome() {
      const y = await pegarNProducao()
      this.nome = y.data
      // console.log(this.nome)
    },

    AparecerHistorico() {
      this.h = true
      this.botao = false
      this.exibir_registro = false
    },

    fechaHistorico() {
      this.h = false
      this.botao = true
      this.exibir_registro = false
      this.h = false
      this.botao = true
    },

    // essa funcao fecha a tela de historico e abre a de atualização
    // deve ser chamada através de um emit vindo da tela de historico
    // no momento em que o usuario clicar no botão "Atualizar"
    ExibirTela_update() {
      this.h = false
      this.botao = false
      this.update_registro = true
      console.log("foi")
      console.log(this.update_registro)
    },

    //
    async pesquisa() {
      await pesquisarHistorico()
    }
    //
  },

  mounted() {
    this.pegarnome()
  }
}
</script>

<template>
  <div class="m-4">
    <div class="row g-3 m-1">
      <div class="col-md-11 ps-5 text-center">
        <h2>HISTÓRICO</h2>
        <div class="class">
          <div class="row mt-3">

            <!-- WIP -->

            <form class="d-flex col-md-3 position-absolute end-0 " role="search">

              <input class="form-control me-2 " type="text" placeholder="Nº Produção:" aria-label="Search" v-model="query" />


              <img id="lupa" src="lupa.png">

              <button class="btn btn-primary" type="button" @click="resultadoHistorico(query)">

                Pesquisar

              </button>

            </form>

            <!--  -->

          </div>
        </div>
      </div>
    </div>

    <div class="row mt-4">
      <div v-if="botao == true">

        <div class="row mt-2" v-for="hi in nome" :key="hi">

          <div class="row">
            <button class="btn btn-primary col-md-3 ab d-flex justify-content-start" type="button"
              @click="AparecerHistorico(), GetHistorico(hi.n_producao)">Produção n° {{ hi.n_producao }}
            </button>
          </div>
        </div>
      </div>

      <div v-if="h == true">

        <div v-if="h == true">
          <ExibirHistorico @fechar-Historico="fechaHistorico" @update-Registro="ExibirTela_update" v-if="dados != ''" :dados="dados" />
        </div>
      </div>
      <div v-if="update_registro == true">
        <UpdateRegistro :dados="dados" />
      </div>

      <div v-if="exibir_registro == true">
                  <div class="row">
            <button class="btn btn-primary col-md-3 ab d-flex justify-content-start" type="button"
              @click="AparecerHistorico(), GetHistorico(query)">Produção n° {{ dados.n_producao }}
            </button>
          </div>
      </div>

    </div>
  </div>
</template>
