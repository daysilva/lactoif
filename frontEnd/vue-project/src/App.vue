<script>
import { RouterLink, RouterView } from "vue-router";
import FormLogin from "./components/FormLogin.vue";


export default {
  components: {
    FormLogin,
  },

  data() {
    return {
      
      selecionado1: localStorage.getItem('selecionado1') == 'true',
      naoSelecionado1: localStorage.getItem('naoSelecionado1') == 'true',

      selecionado2: localStorage.getItem('selecionado2') == 'true',
      naoSelecionado2: localStorage.getItem('naoSelecionado2') == 'true',

      selecionado3: localStorage.getItem('selecionado3') == 'true',
      naoSelecionado3: localStorage.getItem('naoSelecionado3') == 'true',

      selecionado4: localStorage.getItem('selecionado4') == 'true',
      naoSelecionado4: localStorage.getItem('naoSelecionado4') == 'true',

      selecionado5: localStorage.getItem('selecionado5') == 'true',
      naoSelecionado5: localStorage.getItem('naoSelecionado5') == 'true',

    };
  },

  methods: {
    registrarProducao() {

      localStorage.setItem('selecionado1', true) // ligar escuro
      localStorage.setItem('naoSelecionado1', false) // desligar claro

      localStorage.setItem('selecionado2', false) // desligar escuro
      localStorage.setItem('naoSelecionado2', true) // ligar claro

      localStorage.setItem('selecionado3', false) // deligar escuro
      localStorage.setItem('naoSelecionado3', true) // ligar claro

      localStorage.setItem('selecionado4', false) // desligar escuro
      localStorage.setItem('naoSelecionado4', true) // ligar claro

      localStorage.setItem('selecionado5', false) // desligar escuro
      localStorage.setItem('naoSelecionado5', true) // ligar claro


    },

    registroDeProducao() {

      localStorage.setItem('selecionado2', true) // ligar escuro
      localStorage.setItem('naoSelecionado2', false) // desligar claro

      localStorage.setItem('selecionado1', false) // desligar escuro
      localStorage.setItem('naoSelecionado1', true) // ligar claro

      localStorage.setItem('selecionado3', false) // deligar escuro
      localStorage.setItem('naoSelecionado3', true) // ligar claro

      localStorage.setItem('selecionado4', false) // desligar escuro
      localStorage.setItem('naoSelecionado4', true) // ligar claro

      localStorage.setItem('selecionado5', false) // desligar escuro
      localStorage.setItem('naoSelecionado5', true) // ligar claro

    },

    historico() {


      localStorage.setItem('selecionado3', true) // ligar escuro
      localStorage.setItem('naoSelecionado3', false) // desligar claro

      localStorage.setItem('selecionado1', false) // desligar escuro
      localStorage.setItem('naoSelecionado1', true) // ligar claro

      localStorage.setItem('selecionado2', false) // desligar escuro
      localStorage.setItem('naoSelecionado2', true) // ligar claro

      localStorage.setItem('selecionado4', false) // desligar escuro
      localStorage.setItem('naoSelecionado4', true) // ligar claro

      localStorage.setItem('selecionado5', false) // desligar escuro
      localStorage.setItem('naoSelecionado5', true) // ligar claro
    },

    estoque() {
    
      localStorage.setItem('selecionado4', true) // ligar escuro
      localStorage.setItem('naoSelecionado4', false) // desligar claro

      localStorage.setItem('selecionado1', false) // desligar escuro
      localStorage.setItem('naoSelecionado1', true) // ligar claro

      localStorage.setItem('selecionado2', false) // desligar escuro
      localStorage.setItem('naoSelecionado2', true) // ligar claro

      localStorage.setItem('selecionado3', false) // deligar escuro
      localStorage.setItem('naoSelecionado3', true) // ligar claro

      localStorage.setItem('selecionado5', false) // desligar escuro
      localStorage.setItem('naoSelecionado5', true) // ligar claro
      
    },

    // funcao usada para entrar na conta e fazer com q o formulario suma e o navbar apareça em seu lugar 
    ExibirNavBar(){
      localStorage.setItem('usuario_logado', true)
      console.log("usuario esta logado", localStorage.getItem('usuario_logado') == true)

      this.usuarioLogado()

      window.location.href = "/registrar_producao"

    },


  exib_login() {
      let a = localStorage.getItem('exib_login')
      return a == 'true'
    },
    exib_navBar() {
      let a = localStorage.getItem('exib_navBar')
      return a == 'true'
    },

    usuarioLogado() {

      if (localStorage.getItem('usuario_logado') == 'true') {
        localStorage.setItem('exib_login', false)
        localStorage.setItem('exib_navBar', true)
      }

      else {
        localStorage.setItem('exib_login', true)
        localStorage.setItem('exib_navBar', false)

        let verifca_pagina_atual = window.location.href
        let pagina_atual = "http://127.0.0.1:5173/"

        if (verifca_pagina_atual != pagina_atual) {
          window.location.href = "/"
        }
      }

    },

    sair_da_conta() {
      localStorage.setItem('usuario_logado', false)
      window.location.href = "/"

      this.usuarioLogado()
    },

    // como primeira configuração das cores de links teremos isso
    // o primeiro link ficara ativo/escurinho
    LinksAtivosPage1() {

      let verifca_pagina_atual = window.location.href

      let registrar_producao = "http://127.0.0.1:5173/registrar_producao"
      let registro_de_producao = "http://127.0.0.1:5173/registro_de_producao"
      let historico = "http://127.0.0.1:5173/historico"
      let estoque = "http://127.0.0.1:5173/estoque"

      if (verifca_pagina_atual == registrar_producao) {
        this.registrarProducao()
      }

      else if (verifca_pagina_atual == registro_de_producao) {
        this.registroDeProducao()
      }

      else if (verifca_pagina_atual == historico) {
        this.historico()
      }

      else if (verifca_pagina_atual == estoque) {
        this.estoque()
      }
    }
  },

  mounted() {
    this.usuarioLogado()
    this.LinksAtivosPage1()
  }
};
</script>

<template>
  <div>

    <!-- como primeira tela temos o formulario -->
    <div v-if="exib_login() == true">
      <FormLogin @Exibir-NavBar="ExibirNavBar" />
    </div>

    <!-- se os dados estiverem corretos o formulario desaparece 
    e esse nav bar deve aparecer
    e como primeira tela temos a de registrar producao -->
    <div v-if="exib_navBar() == true">
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <a
            @click="registrarProducao"
            :class="{
              'link-menu-ativo': selecionado1,
              'link-menu-nao-ativo': naoSelecionado1,
            }"
            class="nav-link active fw-semibold text-dark"
            aria-current="page"
            href="/registrar_producao"
            >Registrar produção</a
          >
        </li>

        <li class="nav-item">
          <a
            @click="registroDeProducao"
            :class="{
              'link-menu-ativo': selecionado2,
              'link-menu-nao-ativo': naoSelecionado2,
            }"
            class="nav-link mx-2 fw-semibold text-dark"
            aria-current="page"
            href="/registro_de_producao"
            >Registro de produção</a
          >
        </li>

        <li class="nav-item">
          <a
            @click="historico"
            :class="{
              'link-menu-ativo': selecionado3,
              'link-menu-nao-ativo': naoSelecionado3,
            }"
            class="nav-link px-5 fw-semibold text-dark"
            aria-current="page"
            href="/historico"
            >Historico</a
          >
        </li>

        <li class="nav-item">
          <a
            @click="estoque"
            :class="{
              'link-menu-ativo': selecionado4,
              'link-menu-nao-ativo': naoSelecionado4,
            }"
            class="nav-link mx-2 px-5 fw-semibold text-dark"
            aria-current="page"
            href="/estoque"
            >Estoque</a
          >
        </li>


        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <a
              @click="sair_da_conta"
              :class="{
                'link-menu-ativo': selecionado5,
                'link-menu-nao-ativo': naoSelecionado5,
              }"
              class="nav-link mx-2 px-5 fw-semibold text-dark"
              aria-current="page"
              href="/"
              >Sair</a
            >
          </li>
        </ul>
      </ul>
    </div>

    <RouterView />
  </div>
</template>

<style scoped></style>
