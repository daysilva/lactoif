<script>
  import { getHistorico, pegarNProducao} from '../axios';

   export default {
    name: "Historico",

    data() {
      return {
        dados: "",
        nome: ""
      }
    },

    methods: {
      async GetHistorico(n_producao) {
        const x = await getHistorico(n_producao)
        this.dados = x.data
        console.log(this.dados)
      },

      async pegarnome(){
        const y = await pegarNProducao() 
         this.nome = y.data
        console.log(this.nome)
      }
    },

    mounted() {
      this.GetHistorico("1-2022")

      this.pegarnome()
    }
   }
</script>


<template>
  <div class="row g-3 m-1">
      <div class="col-md-10 ps-4 text-center">
        <h2>HISTORICO</h2>
        <div class="class">
          <div class="row  mt-3">
            
              <form class="d-flex  col-md-3   position-absolute  end-0 " role="search">
               <input class="form-control me-2  " type="search" placeholder="Pesquisar" aria-label="Search">
               <img src="lupa.png">
  
              </form>

              
         </div>
          <div class="row  mt-5">
          <div class="row  mt-2"
            
            v-for ="hi in nome"
            :key= "hi"
            >


          <div class="row">
            
      
            <button class="btn btn-primary  col-md-3 ab d-flex justify-content-start" type="submit">1/2022</button>
          
            
            <button class="btn btn-primary  col-md-3 ab d-flex justify-content-start " type="submit">Produção n° {{hi.n_producao}}</button>
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
