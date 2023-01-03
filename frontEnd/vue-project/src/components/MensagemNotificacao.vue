<template>
    <!--  -->
    <div v-if="sucesso == false" class="col-11 d-flex justify-content-center position-absolute top-50 start-50 translate-middle">
        <div :class="{ 'text-danger p-3 fw-bold border border-2 rounded-pill border-danger': isActive }" role="alert">
            {{msg}}
        </div>
     </div>

     <div v-else class="col-11 d-flex justify-content-center position-absolute top-50 start-50 translate-middle">
        <div :class="{ 'text-success p-3 fw-bold border border-2 rounded-pill border-success': isActive }" role="alert">
            {{msg}}
        </div>
     </div>
</template>

<script>
   export default {
    name: "MensagemNotificacao",
    props: {
        msg: String,
        isActive: Boolean,
        sucesso: Boolean
    }
   }
</script>