<template>
  <div>
    <div class="row">

      <MensagemErro :msg="msgErro" :isActive="ativo" />

      <div
        class="col-md-6 position-absolute top-50 start-50 translate-middle backgoundForm p-4 h-75"
      >
        <h1 class="h1-color text-center mt-5 mb-4">LACTOIF</h1>
 
        <form>
          <div class="row">
            <div class="col-11">
              <div class="mb-3 ps-4">
                <input
                  v-model="nomeUsuario"
                  type="text"
                  class="form-control rounded-4"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Usuario"
                />
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-11">
              <div class="mb-3 ps-4">
                <input
                  v-model="senhaUsuario"
                  type="password"
                  class="form-control rounded-4"
                  id="exampleInputPassword1"
                  placeholder="Senha"
                />
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-11">
              <div class="d-flex justify-content-center">
                <button class="botoes rounded-pill col-7"
                @click="Entrar_na_Conta" 
                type="button">entrar</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style>
.backgoundForm {
  background-color: #c2d0e4;
}
</style>

<script>
import {ValidarUser} from "../axios"

import MensagemErro from "./MensagemErro.vue"


export default {
  name: "FormLogin",
  components: {
    MensagemErro
  },
  emits: ["ExibirNavBar"],

  data() {
    return {
      nomeUsuario: "",
      senhaUsuario: "",
      link: "",
      msgErro: "",
      ativo: false,
    }
  },

  methods: {
      async Entrar_na_Conta(){
          const validar = await ValidarUser(this.nomeUsuario, this.senhaUsuario)

          if (validar.data == true) {
            // entrar
            // this.link = "/registrar_producao"
            // window.location.href = "/registrar_producao"

            // fazer o formulario desaparecer
            this.$emit('ExibirNavBar')
          }
          else {
            // msg de erro
            this.msgErro = "Usuario ou senha incorreta!"
            this.ativo = true
          }
        }
  }  
}



</script>
