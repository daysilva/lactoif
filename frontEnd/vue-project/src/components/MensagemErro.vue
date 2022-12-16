<template>
    <!--  -->
    <div class="col-11 d-flex justify-content-center mt-2">
        <div :class="{ 'alert alert-danger': isActive }" role="alert">
        {{msg}}
      </div>
     </div>
</template>

<script>
   export default {
    name: "MensagemErro",
    props: {
        msg: String,
        isActive: Boolean
    }
   }
</script>