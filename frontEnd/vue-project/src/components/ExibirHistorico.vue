<template>
<div>
    <form>
      <div class="row g-3 m-1">
      </div>
      <div class="m-5">
        <div class="row">
          <div class="col-m-5 col-md-2">
            <div class="for-text">Produção n°</div>
          </div>

          <div class="ab az col-md-1">
            <div
              class="py-1 rounded-pill" style="diplay: flex; margin-top: 0.3rem; padding-left: 0.8rem; padding-right: 0.8rem;">
              2/2020
            </div>
          </div>
        </div>
        <div class="row">
          <div>
            <label for="text" class="col-md-4">Data de Inicio:</label>
            <div class="ab az col-md-2">
              <div
                class="py-2 rounded-pill" style="diplay: flex; margin-top: 0.3rem; padding-left: 0.8rem; padding-right: 0.8rem;">
                10/10/2010
              </div>
            </div>
          </div>
        </div>
        <div class="row mt-1">
          <div>
            <label for="text" class="col-md-4">Data de Finalização:</label>
            <div class="ab az col-md-2">
              <div
                class="py-2 rounded-pill" style="diplay: flex; margin-top: 0.3rem; padding-left: 0.8rem; padding-right: 0.8rem;">
                11/11/2011
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <!-- esquerda -->
          <div class="col">
            <div class="row" style="diplay: flex; padding-top: 4rem">
              <label for="text" class="col-md-12">Ingrendientes Ultilizados</label>

              <div class="col-md-5">
                <div
                 class="input-group">
                  <div class="form-control az ac">açucar</div>
                  <span class="input-group-text ax">2 Kg</span>
                </div>
  
              </div>
            </div>
          </div>
          <!-- direita -->
          <div class="col">
            <div class="row" style="diplay: flex; padding-top: 4rem">
              <label for="text" class="col-md-12">Produto(s) Produzido(s)</label>

              <div class="col-md-5">

                <div
                class="input-group">
                  <div class="form-control az ac">bolo</div>
                  <span class="input-group-text ax">3 unidades</span>
                </div>
                
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          
          <!-- esquerdo -->
          <div class="col">
            <div class="row mt-5">
              <label for="text" class="col-md-12">Tecnico(os) Responsável(eis)</label>

              <div class="col-md-4">

                <div
                class="form-control az ab" aria-label="Recipient's username">
                  Ramon
                </div>
                
              </div>
            </div>
          </div>

          <!-- direito -->
          <div class="col">
            <div class="row mt-5">
              <label for="text" class="col-md-12">Auxiliar(es) de Produção</label>

              <div class="col-md-4">
                <div
                class="form-control az ab">Andreilson</div>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <!-- esquerdo -->
          <div class="col">
            <div class="row mt-3">
              <div class="mb-3 mt-4">
                <label for="exampleFormControlTextarea1" class="form-label"
                  >Objetivo da Atividade</label
                >
                <div
                  class="form-control az tam ab">Aula</div>
              </div>
            </div>
          </div>
          <!-- direito -->
          <div class="col">
            <div class="row mt-3">
              <div class="mb-3 mt-4">
                <label for="exampleFormControlTextarea1" class="form-label"
                  >Registro de Ocorrência</label
                >
                <textarea
                  class="form-control az tam ab"
                  id="exampleFormControlTextarea1"
                  rows="3"
                ></textarea>
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
        name: "ExibirHistorico",
        props: {
            dados: Object
        }
    }
</script>