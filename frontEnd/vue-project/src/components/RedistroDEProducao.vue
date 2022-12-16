<template>
    <div>
      <form>
            <div class="row g-3 m-1">
                <div class="col-md-10 ps-4 text-center">
                <h2>REGISTO DE PRODUCAO</h2>
            </div>
            </div>
            <div class="col m-5">
                <div class="row">
                            
                           
                            <div class="col-m-5 col-md-2 ">
                            <div class="for-text ">Produção n°</div>
                            </div>
                            

                                <div class="ab az col-md-1" >
                           <div class="rounded-pill   " style="diplay:flex; margin-top:0.3rem ; padding-left: 0.8rem;padding-right: 0.8rem; ">
                             1/2023
                             </div>
                            
                             </div>
                           
                </div>
                <div class="row">
                    <div >
                           <label for="text" class="col-md-4" >Data de Inicio:</label>
                            <div class="ab az col-md-2" >
                           <div class="rounded-pill   " style="diplay:flex; margin-top:0.3rem ; padding-left: 0.8rem;padding-right: 0.8rem; ">
                             24/03/20022-5:00
                             </div>
                            </div>
                           
                        </div>
                </div>
                <div class="row mt-1">
                    <div >
                           <label for="text" class="col-md-4 " >Data de Finalização:</label>
                            <div class="ab az col-md-2" >
                           <div class="rounded-pill   " style="diplay:flex; margin-top:0.3rem ; padding-left: 0.8rem;padding-right: 0.8rem; ">
                             24/03/20022-19:00
                             </div>
                            </div>
                           
                        </div>
                </div>
                <div class="row ">
                <!-- direta -->
                <div class="col">
                    <div class="row " style="diplay:flex; padding-top:4rem">
                    
                    <label for="text" class="col-md-12 " >Ingrendientes Ultilizados</label>
                    
                     <div class="col-md-5">
                     <div class="input-group" >
      <div class="form-control az ac ">leite</div>
      <span class="input-group-text ax">2L</span>
    </div>
    <div class="input-group" >
      <div class="form-control az ac ">acucar</div>
      <span class="input-group-text ax">2KG</span>
    </div>
</div>           
                  
                    
         </div>
                </div>
             <!-- esquerda -->
             <div class="col">
                <div class="row " style="diplay:flex; padding-top:4rem">
                    
                    <label for="text" class="col-md-12 " >Produto(s) Produzido(s)</label>
                 

                      <div class="col-md-5">
                     <div class="input-group" >
      <div class="form-control az ac ">iogut</div>
      <span class="input-group-text ax">2L</span>
    </div>
    <div class="input-group" >
      <div class="form-control az ac ">doce</div>
      <span class="input-group-text ax">2KG</span>
    </div>
    <div class="input-group" >
      <div class="form-control az ac ">queijo</div>
      <span class="input-group-text ax">22KG</span>
    </div>
</div>           
                     
                     
         </div>
             </div>
            </div>
            <div class="row">
                <div class="col">
                    <div class="row mt-5">
    
    <label for="text" class="col-md-12 " >Tecnico(os) Responsável(eis)</label>
    
   <div class="col-md-4">
  <div  class="form-control az ab" aria-label="Recipient's username" >ramon </div>
  <div  class="form-control az ab" aria-label="Recipient's username" >Mayomir </div>
</div>
 
</div> 
                </div>
                <div class="col">
                    <div class="row mt-5">
                    <label for="text" class="col-md-12 " >Auxiliar(es) de Produção</label>
    
   <div class="col-md-4">
  <div  class="form-control az ab"  > Jerfeson</div>
</div>
                   </div>
                </div>

            </div>
            <div class="row">
                <div class="col">
                    <div class ="row mt-3" >
                         <div class="mb-3 mt-4 ">
                           <label for="exampleFormControlTextarea1" class="form-label">Objetivo da Atividade</label>
                          <textarea class="form-control az tam  ab" id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>
                      </div>  
                </div>
                <div class="col">
                    <div class ="row mt-3" >
                         <div class="mb-3 mt-4 ">
                           <label for="exampleFormControlTextarea1" class="form-label">Registro de Ocorrência</label>
                          <textarea class="form-control az tam  ab" id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>
                      </div>  
                </div>
            </div>
            </div>
        </form>
        
    </div>
</template>

<script>
   export default {
    name: "RegistroDeProducao"
   }
</script>