<template>
  <div class="container__box">
    <div class="row">
      <h4>Entradas</h4>
      <strong @click="updateProdLocation">Prelocate</strong>
    </div>
    <div class="row">
      <TableSimple
        :item="tableDataDetails"
        :cols="9"
        @rowClick="goToDetail($event)"
      />
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

import TableSimple from "@/components/TableSimple.vue";
export default {
  name: "PreloadsAll",

  components: {
    TableSimple,
  },

  data() {
    return {
      itemData: "",
    };
  },
  mounted() {
    this.getAllPreloads();
  },

  methods: {
    ...mapActions(["getAllPreloads"]),

    updateProdLocation(){
      this.$store.dispatch("setPreloadLocation")
    },

    goToDetail(index) {
      this.$router.push({
        name: "EntryLoaded",
        params: { entryId: index.preload_id },
      });
    },
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