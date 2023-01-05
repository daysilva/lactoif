<script>
  import { getHistorico } from '../axios';

   export default {
    name: "Historico",

    data() {
      return {
        dados: ""
      }
    },

    methods: {
      async GetHistorico(n_producao) {
        const x = await getHistorico(n_producao)
        this.dados = x.data
        console.log(this.dados)
      }
    },

    mounted() {
      this.GetHistorico("2-2023")
    }
   }
</script>


<template>
    <div>
        sem Registo
       
    </div>
</template>
