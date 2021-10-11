<template>
  <div class="container__box">
    <Loader v-show="loader" />
    <h4>Información de entrada</h4>
    <div class="row between center">
      <Finder
        phText="Ingresa el Id de precarga"
        @search="getEntrieInfo(idTyped)"
        v-model="idTyped"
      />
      <div class="row center">
        <TableDetail :item="tableData" :topCols="9" :cols="3" />
      </div>
    </div>
  </div>
</template>
<script>
import Finder from "@/components/Finder";
import Loader from "@/components/Loader.vue";
import TableDetail from "@/components/TableDetails";
import TableSimple from "@/components/TableSimple";
import { mapGetters } from "vuex";
export default {
  name: "EntrieLoaded",

  components: {
    Finder,
    Loader,
    TableDetail,
    TableSimple,
  },

  data() {
    return {
      idTyped: "",
    };
  },

  created() {
    this.$store.dispatch("getPreloadDetail", '6df2e541-8592-480a-8c35-f1f14ebbcd44')
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

    tableData() {
      const table = {
        topHead: [
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
        topRows: this.entryDataResult,
      };
      return table;
    },
  },
};
</script>