<template>
  <div class="outs__form">
    <div class="row">
      <h4>Salidas</h4>
    </div>
    <div class="row between xcenter">
      <InputRegister txtBtnOk="Agregar"  @actionForm="registerOut()" />
    </div>
  </div>
</template>
<script>
import InputRegister from "@/components/InputRegister";
export default {
  name: "OutsAddNew",

  components: {
    InputRegister,
  },

  data() {
    return {
      product: {
        idProd: "",
        quantity: null,
      },
    };
  },

  methods: {
    registerOut(){

    }
  }
};
</script>