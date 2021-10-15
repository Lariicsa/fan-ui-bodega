<template>
  <div class="container__box">
    <div class="row">
      <h4>Precargas</h4>
    </div>
    <div class="row">
      <br />
      <strong @click="updateProdLocation">Prelocate</strong>
      <br />
      <strong @click="updateProdStatus">Status</strong>
    </div>
    <div class="row">
      <TableSimple
        :item="tableDataDetails"
        :cols="8"
        modifier="hasHover"
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

    updateProdLocation() {
      this.$store.dispatch("setPreloadLocation");
    },

    updateProdStatus() {
      this.$store.dispatch("updatePreloadsStatus");
    },

    goToDetail(index) {
      this.$router.push({
        name: "PreloadsFind",
        params: { preloadId: index.preload_id },
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
          //"#Orden",temporally hiden
          "Status",
        ],
        rows: this.currentPreloads,
      };
      return table;
    },
  },
};
</script>