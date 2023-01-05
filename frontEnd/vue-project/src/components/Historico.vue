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
<<<<<<< HEAD
    <div>
        sem Registo
       
    </div>
=======
    <div class="row g-3 m-1">
        <div class="col-md-10 ps-4 text-center">
          <h2>HISTORICO</h2>
          <div class="row">
            <form class="d-flex  col-md-3   position-absolute  end-0 " role="search">
        <input class="form-control me-2  " type="search" placeholder="Pesquisar" aria-label="Search">
  
      </form>
          </div>

          <div class="row">
            
            
            <button class="btn btn-primary  col-md-3 ab " type="submit">1/2022</button>
          
          </div>
        </div>
      </div>
>>>>>>> a40eb935c48338b79e3e9391c793ad70e09cf797
</template>
