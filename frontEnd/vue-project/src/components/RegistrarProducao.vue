<script>
   import { PegarTecnicos, PegarAuxiliar, PegarIngrediente, RegistrarProducao } from '../axios';

   export default {
   name: "RegistrarProdução",
   data () {
   return {
      nomeTec: "",
      nomeAuxi: "",
      nomeIngred: "",


      // variaveis que vao pegar os valores selecionados e mandar para
      // a funcao regidtrarProducao()
      nomeP: "",
      quantProd: "",
      nomeProd_Criado: [], // .push({"nome_produto": "iorgute", "quantidade_produzida": 2})
      n_producao: "",
      data_inicio: "",
      data_fim: "",
      regist_ocorren: null,
      objetivo: "",
      nomeAuxiliares: [],
      nomeTecnicos: [],
      ingredientesUtili: [] // .push({}, {})

   }
   },

   methods: {
   async exibirTecnicos() {
      const tec = await PegarTecnicos()
      this.nomeTec = tec.data
   },

   async exibirAuxiliares() {
      const auxi = await PegarAuxiliar()
      this.nomeAuxi = auxi.data
   },

   async exibirIngredientes() {
      const ingre = await PegarIngrediente()
      this.nomeIngred = ingre.data
   },

   async registrarProducao() {
      // RegistrarProducao()
      console.log(this.nomeProd_Criado)
   },


   },
   mounted() {
      this.exibirTecnicos()
      this.exibirAuxiliares()
      this.exibirIngredientes()
   },
   }

</script>


<template>
    <div class="mx-5">
       <form>
          <div class="row g-3 m-1 ">
             <div class="col-md-10 ps-4 text-center">
                <h2>REGISTAR PRODUCAO</h2>
             </div>
            
       </div>
       <div class="row g-2 mt-4">
                      <!-- conteudo esq -->
                      <div class="col g-2 ">
                        <div class="row">
                           <label for="text" class="col-md-4 " >n° de produçao</label> 
                           <div class="col-md-3">
                             <input type="text" class="form-control az h-1 ab" id="text">
                            </div>
                        </div>
                        <div class="row mt-5 " >
                                 <label for="text" class="col-md-5 "> Tecnicos de Produçao </label> 
                                 <div class="col-md-6">
                                     
                                    <button class="btn btn-secondary dropdown-toggle col-md-6 ab" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                          
                                    </button>
                                    <ul class="dropdown-menu ">
                                          <div
                                          v-for="n in nomeTec"
                                          :key="n.nome"
                                           class="form-check">
                                          <li><input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"></li>
                                          <label class="form-check-label" for="flexCheckChecked">{{n.nome}}</label>
                                          </div>
                                    </ul>
                           
                               </div>
                         </div>
                               
                         
                         <div class="row mt-3">
                              <label for="text" class="col-md-5 "> Auxiliares </label> 
                              <div class="col-md-6"> 
                                <button class="btn btn-secondary dropdown-toggle ab col-md-6" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                 </button>      
                                    <ul class="dropdown-menu ">
                                          <div 
                                          v-for="n in nomeAuxi"
                                          :key="n.nome"
                                          class="form-check">
                                             <li><input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"></li>
                                             <label class="form-check-label" for="flexCheckChecked">{{n.nome}}</label>
                                          </div>
                                    </ul>        
                         </div>     
                        
                      </div>     
                        
                      <div class="row mt-5  ">
                               <div class="col ">
                                  <div class="row ">
                                     <label for="text" class="col-md-5 "> Tipos de ingrendientes </label> 
                                 <div class="col-md-6">
                                     
                                             <button class="btn btn-secondary dropdown-toggle col-md-6 ab" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                 
                                             </button>
                                             <ul class="dropdown-menu ">
                                                 <div
                                                 v-for="n in nomeIngred"
                                                 :key="n.nome"
                                                  class="form-check">
                                                   <li><input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"></li>
                                                   <label class="form-check-label" for="flexCheckChecked">{{n.nome}}</label>
                                                 </div>
                                             </ul>
                                    
                               </div>
                                 </div>
                               </div>
                                 
                                  <div class="row mt-5">
                                     <label for="text" class="col-md-5"> Quantidade </label> 
                                 <div class="col-md-6">
                                     
                                             <button class="btn btn-secondary dropdown-toggle col-md-7 ab" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                 
                                             </button>
                                             <ul class="dropdown-menu ">
                                                 <div class="form-check">
                                                    
                                                 <li><input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"></li>
                                                 <label class="form-check-label" for="flexCheckChecked">5litros</label>
                                                 </div>
                                                 <div class="form-check">
                                                 <li><input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"> </li>
                                                 <label class="form-check-label" for="flexCheckChecked">2kg</label>
                                             </div>
                                              <div class="form-check">
                                                 <li><input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"></li>
                                                 <label class="form-check-label" for="flexCheckChecked">1kg</label>
                                             </div>
                                             </ul>
                                    
                               </div>
                               </div>
                               
                            
                            </div>
 
                         
                             
                                
                               <div class ="row" >
                         <div class="mb-3 mt-5 ">
                           <label for="exampleFormControlTextarea1" class="form-label">Objetivo da Atividade</label>
                          <textarea class="form-control az tam ab" id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>
                      </div>
                      </div>
                     <!-- conteudo dir -->
                     <div class="col" >
 
                         <div class="row mt-5  " >
                             <div class="row mt-3 ">
                                 <label for="text" class="col-md-4">Data de inicio</label> 
                                 <div class="col-md-6 ">
                                    <input type="datetime-local" class="form-control az ab" id="datetime-local">
                                 </div>
                            </div>
                         </div>
                      <div class="row ">
                         <div class="row mt-4 ">
                                 <label for="text" class="col-md-4 " >Data de finalização</label> 
                                 <div class="col-md-6">
                                    <input type="datetime-local" class="form-control az ab" id="datetime-local">
                                 </div>
                            </div>
                     </div>
                     
                                  
                               <div class="col">
                                  <div class="row mt-2" style="diplay:flex; padding-top:3rem ">
                                     <label for="text" class="col-md-2 "> Produto(os) </label> 
                                 <div class="col-md-6">
                                     
                                             <button class="btn btn-secondary dropdown-toggle col-md-12  ab" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                 
                                             </button>
                                             <ul class="dropdown-menu ">
                                                 <div class="form-check">
                                                    
                                                 <li><input class="form-check-input" type="checkbox" value="queijo" v-model="nomeProd_Criado" id="flexCheckDefault"></li>
                                                 <label class="form-check-label" for="flexCheckChecked">queijo</label>
                                                 </div>
                                                 <div class="form-check">
                                                 <li><input class="form-check-input" type="checkbox" value="bolo" v-model="nomeProd_Criado" id="flexCheckDefault"> </li>
                                                 <label class="form-check-label" for="flexCheckChecked">bolo</label>
                                             </div>
                                              <div class="form-check">
                                                 <li><input class="form-check-input" type="checkbox" value="doce" v-model="nomeProd_Criado" id="flexCheckDefault"></li>
                                                 <label class="form-check-label" for="flexCheckChecked">doce</label>
                                             </div>
                                             </ul>
                                    
                               </div>
                                 </div>
                               </div>
                                 
                                  <div class="row mt-5">
                                     <label for="text" class="col-md-4 "> Quantidade gerados</label> 
                                 <div class="col-md-6">
                                     
                                             <button class="btn btn-secondary dropdown-toggle col-md-7 ab" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                 
                                             </button>
                                             <ul class="dropdown-menu ">
                                                 <div class="form-check">
                                                    
                                                 <li><input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"></li>
                                                 <label class="form-check-label" for="flexCheckChecked">5kg</label>
                                                 </div>
                                                 <div class="form-check">
                                                 <li><input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"> </li>
                                                 <label class="form-check-label" for="flexCheckChecked">2kg</label>
                                             </div>
                                              <div class="form-check">
                                                 <li><input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"></li>
                                                 <label class="form-check-label" for="flexCheckChecked">2bolo</label>
                                             </div>
                                             </ul>
                                    
                               </div>
                               </div>
                               
                            
                            
                                  
                               

                      <div class ="row mt-5">
                         <div class="mb-3">
                           <label for="exampleFormControlTextarea1" class="form-label">Registro de Ocorrencia</label>
                          <textarea class="form-control az tam ab" id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>
                     </div>
                      
                      
             </div>
 
          </div>
             
       </form>
       <div class="mb-4 text-end mt-5">
          <button @click="registrarProducao" class="btn btn-primary" type="submit">Prosseguir</button>
      </div>
     
    </div>
 </template>
 