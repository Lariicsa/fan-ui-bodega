<template>
  <div class="col">
    <Loader v-show="loader" />
    <h4>Buscar entrada</h4>

    <div class="row between">
      <Finder
        phText="Ingresa el Id de precarga"
        @search="findEntryBy(paramValue)"
        v-model="paramValue"
      />
      <div class="row center">
        <TableSimple :item="tableDataDetails" :cols="9" />
      </div>
      <div v-if="exists" class="row center">
        <Message type="notfound robot">No existe ID de entrada</Message>
      </div>
    </div>
  </div>
</template>
<script>
import Finder from "@/components/Finder";
import Loader from "@/components/Loader.vue";
import Message from "@/components/Message";
import TableDetail from "@/components/TableDetails";
import TableSimple from "@/components/TableSimple";
import { mapGetters } from "vuex";
export default {
  name: "EntryFind",

  components: {
    Finder,
    Loader,
    Message,
    TableDetail,
    TableSimple,
  },

  // props: {
  //   entryId: {
  //     type: String,
  //   },
  // },

  data() {
    return {
      idTyped: "",
      paramType: "",
      paramValue: "",
    };
  },

  methods: {
    findEntryBy(key) {
      let param = this.paramType;
      switch (param) {
        case "barcode":
          this.$store.dispatch("findEntryByParam", `?barcode=${key}`);
          break;

        case "productKey":
          this.$store.dispatch("findEntryByParam", `?productKey=${key}`);
          break;

        default:
          this.$store.dispatch("findEntryByParam", `?name=${key}`);
          break;
      }
    },

    getEntrieInfo(entrieId) {
      this.$store.dispatch("getPreloaded", entrieId).then(() => {
        this.$store.dispatch("getPreloadDetail", entrieId);
      });
    },
  },

  computed: {
    ...mapGetters(["entryDataResult", "entryDataDetails", "currentStatus"]),
    loader() {
      return this.$store.state.entries.loader;
    },

    showTable() {
      let status = this.$store.state.entries.statusResponse;
      if (status == 200) {
        return true;
      } else {
        return false;
      }
    },

    tableDataDetails() {
      const table = {
        head: [
          "Clave",
          "Descripción",
          "Editorial",
          "Línea",
          "Control",
          "Ubicación",
          "Actualización",
          "Editor",
          "Cantidad",
        ],
        rows: this.entryDataResult,
      };
      return table;
    },

    exists() {
      let status = this.$store.state.entries.statusResponse;
      if (status == 400) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>