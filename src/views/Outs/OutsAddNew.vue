<template>
  <div class="outs__form">
    <div class="row">
      <h4>Salidas</h4>
    </div>
    <div class="row between xcenter">
      <InputRegister txtBtnOk="Agregar" @actionForm="registerOut()" />
    </div>
    <div class="row outs__row">
      <TableSimple :item="tableDataDetails" :cols="3" />
    </div>
  </div>
</template>
<script>
import InputRegister from "@/components/InputRegister";
import TableSimple from "@/components/TableSimple";
import { mapGetters } from "vuex";
export default {
  name: "OutsAddNew",

  components: {
    InputRegister,
    TableSimple,
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
    registerOut() {},
  },

  computed: {
    ...mapGetters(["itemsOutCohorte"]),
    tableDataDetails() {
      const table = {
        head: ["", "Cantidad", "Clave"],
        rows: this.itemsOutCohorte,
      };
      return table;
    },
  },
};
</script>