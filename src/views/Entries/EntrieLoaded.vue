<template>
  <div class="container__box">
    <Loader v-show="loader" />
    <h4>Entrada 6df2e541-8592-480a-8c35-f1f14ebbcd44</h4>
    <div class="row between center">
      <Finder
        phText="Ingresa el Id de precarga"
        @search="getEntrieInfo(idTyped)"
        v-model="idTyped"
      />
      <div class="row center">
        <TableSimple :item="tableDataDetails" :cols="9" />
      </div>
    </div>
  </div>
</template>
<script>
import Finder from "@/components/Finder";
import Loader from "@/components/Loader.vue";
import TableSimple from "@/components/TableSimple";
import { mapGetters } from "vuex";
export default {
  name: "EntrieLoaded",

  components: {
    Finder,
    Loader,
    TableSimple,
  },

  data() {
    return {
      idTyped: "",
    };
  },

  methods: {
    getEntrieInfo(entrieId) {
      this.$store.dispatch("getPreloaded", entrieId);
    },
  },

  computed: {
    ...mapGetters(["entryDataResult"]),
    loader() {
      return this.$store.state.entries.loader;
    },

    tableDataDetails() {
      const table = {
        head: [
          "id",
          "Asignado a",
          "Descripción",
          "Desde",
          "#Orden",
          "Fecha",
          "Editó",
          "Status",
          "Cantidad",
        ],
        rows: this.entryDataResult,
      };
      return table;
    },
  },
};
</script>