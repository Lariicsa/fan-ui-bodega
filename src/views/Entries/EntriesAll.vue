<template>
  <div class="container__box">
 <div class="row">
   <h4>Entradas</h4>
 </div>
    <div class="row">
      <TableSimple :item="tableDataDetails" :cols="9" />
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import TableSimple from "@/components/TableSimple.vue";
export default {
  name: "EntriesAll",

  components: {
    TableSimple,
  },
  mounted() {
    this.getAllPreloads();
  },

  methods: {
    ...mapActions(["getAllPreloads"]),
  },

  computed: {
    ...mapGetters(["currentPreloads"]),

    tableDataDetails() {
      const table = {
        head: [
          "id",
          "Cantidad",
          "Desde",
          "Fecha",
          "Transacción",
          "Editor",
          "Asignado a",
          "#Orden",
          "Status",
        ],
        rows: this.currentPreloads,
      };
      return table;
    },
  },
};
</script>