<template>
  <!--  :class="{ active: isActive, 'text-danger': hasError }" -->
  <div>
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <a @click="registrarProducao" :class="{'link-menu-ativo': selecionado1, 'link-menu-nao-ativo': naoSelecionado1}"
          class="nav-link active fw-semibold text-dark" aria-current="page" href="#">Registrar produção</a>
      </li>

      <li class="nav-item">
        <a @click="registroDeProducao"
          :class="{ 'link-menu-ativo': selecionado2, 'link-menu-nao-ativo': naoSelecionado2 }"
          class="nav-link mx-2 fw-semibold text-dark" aria-current="page" href="#">Registro de produção</a>
      </li>

      <li class="nav-item">
        <a @click="historico" :class="{ 'link-menu-ativo': selecionado3, 'link-menu-nao-ativo': naoSelecionado3 }"
          class="nav-link px-5 fw-semibold text-dark" aria-current="page" href="#">Historico</a>
      </li>

      <li class="nav-item">
        <a @click="estoque" :class="{ 'link-menu-ativo': selecionado4, 'link-menu-nao-ativo': naoSelecionado4 }"
          class="nav-link mx-2 px-5 fw-semibold text-dark" aria-current="page" href="#">Estoque</a>
      </li>

      <!-- <li class="nav-item dropdown">
    <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Dropdown</a>
    <ul class="dropdown-menu">
      <li><a class="dropdown-item" href="#">Action</a></li>
      <li><a class="dropdown-item" href="#">Another action</a></li>
      <li><a class="dropdown-item" href="#">Something else here</a></li>
      <li><hr class="dropdown-divider"></li>
      <li><a class="dropdown-item" href="#">Separated link</a></li>
    </ul>
  </li> -->

    <ul class="navbar-nav ms-auto">
      <li class="nav-item">
        <a @click="logout" :class="{ 'link-menu-ativo': selecionado5, 'link-menu-nao-ativo': naoSelecionado5 }"
          class="nav-link mx-2 px-5 fw-semibold text-dark" aria-current="page" href="/">Sair</a>
      </li>
    </ul>
  </ul>

    <!-- nosso conteudo -->
    <div v-if="exibirFormulario">
      <RegistrarProducao />
    </div>

    <div v-if="exibirRegistro">
      <RedistroDEProducao />
    </div>

    <div v-if="exibirHistorico">
      <Historico />
    </div>

    <div v-if="exibirEstoque">
      <Estoque />
    </div>


  </div>
</template>

<style>

</style>

<script>

import RedistroDEProducao from '../components/RedistroDEProducao.vue'
import RegistrarProducao from '../components/RegistrarProducao.vue'
import Historico from '../components/Historico.vue'
import Estoque from '../components/Estoque.vue'

export default {
  components: {
    RedistroDEProducao,
    RegistrarProducao,
    Historico,
    Estoque
  },

  data() {
    return {
      exibirFormulario: true,
      exibirRegistro: false,
      exibirHistorico: false,
      exibirEstoque: false,

      selecionado1: true,
      naoSelecionado1: false,

      selecionado2: false,
      naoSelecionado2: true,

      selecionado3: false,
      naoSelecionado3: true,

      selecionado4: false,
      naoSelecionado4: true,

      selecionado5: false,
      naoSelecionado5: true,
    }
  },

  methods: {
    registrarProducao() {
      this.exibirFormulario = true
      this.exibirRegistro = false
      this.exibirHistorico = false
      this.exibirEstoque = false

      this.selecionado1 = true // ligar escuro
      this.naoSelecionado1 = false // desligar escuro

      this.selecionado2 = false // desligar escuro
      this.naoSelecionado2 = true // ligar claro

      this.selecionado3 = false // desligar escuro
      this.naoSelecionado3 = true // ligar claro

      this.selecionado5 = false // desligar escuro
      this.naoSelecionado5 = true // ligar claro

      this.selecionado5 = false // desligar escuro
      this.naoSelecionado5 = true // ligar claro
    },

    registroDeProducao() {
      this.exibirFormulario = false
      this.exibirRegistro = true
      this.exibirHistorico = false
      this.exibirEstoque = false


      this.selecionado2 = true // ligar escuro
      this.naoSelecionado2 = false // desligar escuro

      this.selecionado1 = false // desligar escuro
      this.naoSelecionado1 = true // ligar claro

      this.selecionado3 = false // desligar escuro
      this.naoSelecionado3 = true // ligar claro

      this.selecionado4 = false // desligar escuro
      this.naoSelecionado4 = true // ligar claro

      this.selecionado5 = false // desligar escuro
      this.naoSelecionado5 = true // ligar claro
    },

    historico() {
      this.exibirFormulario = false
      this.exibirRegistro = false
      this.exibirHistorico = true
      this.exibirEstoque = false

      this.selecionado3 = true // ligar escuro
      this.naoSelecionado3 = false // desligar escuro

      this.selecionado1 = false // desligar escuro
      this.naoSelecionado1 = true // ligar claro

      this.selecionado2 = false // desligar escuro
      this.naoSelecionado2 = true // ligar claro

      this.selecionado4 = false // desligar escuro
      this.naoSelecionado4 = true // ligar claro

      this.selecionado5 = false // desligar escuro
      this.naoSelecionado5 = true // ligar claro
    },

    estoque() {
      this.exibirFormulario = false
      this.exibirRegistro = false
      this.exibirHistorico = false
      this.exibirEstoque = true

      this.selecionado4 = true // ligar escuro
      this.naoSelecionado4 = false // desligar escuro

      this.selecionado1 = false // desligar escuro
      this.naoSelecionado1 = true // ligar claro

      this.selecionado2 = false // desligar escuro
      this.naoSelecionado2 = true // ligar claro

      this.selecionado3 = false // desligar escuro
      this.naoSelecionado3 = true // ligar claro

      this.selecionado5 = false // desligar escuro
      this.naoSelecionado5 = true // ligar claro
    }
  }

}
</script>