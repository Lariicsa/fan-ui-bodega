<template>
  <div class="col">
    <Loader v-show="loader" />
    <h4>Buscar precarga</h4>
    <div class="row between">
      <Finder
        phText="Ingresa el Id de precarga"
        @search="getEntrieInfo(idTyped)"
        v-model="idTyped"
      />
      <div v-if="showTable" class="row center">
        <TableDetail :item="tableData" :topCols="8" :cols="8">
          <template v-slot:default="slotProps">
            <div class="tableDetail__cell cols7">
              <Inputfield
                :placeholder="slotProps.nrow.final_location"
                :updateValue="slotProps.nrow.final_location"
                :name="slotProps.nrow.id_product"
                type="text"
                @keyupEnter="updateLocation(slotProps.nrow)"
                v-model="slotProps.nrow.final_location"
                :showError="false"
                typemsg="error"
              />
            </div>
          </template>
        </TableDetail>
      </div>
      <div v-if="exists" class="row center">
        <Message type="notfound robot">No existe ID de entrada</Message>
      </div>
    </div>
  </div>
</template>
<script>
import Finder from "@/components/Finder";
import Inputfield from "@/components/InputField";
import Loader from "@/components/Loader.vue";
import Message from "@/components/Message";
import TableDetail from "@/components/TableDetails";
import TableSimple from "@/components/TableSimple";
import { mapGetters } from "vuex";
export default {
  name: "PreloadsFind",

  components: {
    Finder,
    Inputfield,
    Loader,
    Message,
    TableDetail,
    TableSimple,
  },

  props: {
    entryId: {
      type: String,
    },
  },

  data() {
    return {
      idTyped: "",
      loadEntryId: this.entryId,
    };
  },


  created() {
    this.selectFunction();
  },

  methods: {
    updateLocation(txt) {
      this.$store.dispatch("setPreloadLocation", txt)
      console.log("view", txt);
    },

    selectFunction() {
      if (this.entryId != undefined) {
        this.getEntrieInfo(this.entryId);
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

    tableData() {
      const table = {
        topHead: [
          "Cantidad",
          "Transacción",
          "Desde",
          "Creado por",
          "Fecha",
          "Asignado a",
          "#Orden",
          "Status",
        ],
        topRows: this.entryDataResult,
        head: [
          "id",
          // "Cantidad",
          "Clave",
          "Descripción",
          "Editorial",
         // "Línea",
          "Control",
          // "preUbicación",
          //"Actualización",
          "Status",
          "Ubicación",
          //"Fecha",
        ],
        rows: this.entryDataDetails,
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
