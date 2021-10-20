<template>
  <div class="col">
    <Loader v-show="loader" />
    <h4>Inventario</h4>

    <div class="row between entry__filters">
      <div class="row entry__finder">
        <Finder
          phText="Buscar producto"
          @search="findEntryBy(paramValue)"
          v-model="paramValue"
        />
      </div>

      <div class="row entry__radios">
        <!-- refactor -->
        <Radiooption
          v-model="paramType"
          textOption="Por nombre"
          id="name"
          @click="selectParamKey(paramType)"
        />
        <Radiooption
          v-model="paramType"
          textOption="Por clave"
          id="productKey"
          @click="selectParamKey(paramType)"
        />
        <Radiooption
          v-model="paramType"
          textOption="Por código de barras"
          id="barcode"
          @click="selectParamKey(paramType)"
        />
      </div>
    </div>

    <div class="row center">
      <TableSimple :item="tableDataDetails" :cols="10" colExceptions="">
        <template v-slot:default="slotProps">
          <div class="tableDetail__cell cols10">
            <FanButton
              text="Reubicar"
              ui="secondary"
              @btnClick="showBox(slotProps.nrow)"
            />
          </div>
          <Modal
            :showBox="showUpdateBox === slotProps.nrow.product_id"
            @closeModal="hideBox()"
          >
            <div class="box__full">
              {{ slotProps.nrow }}
            </div>
          </Modal>
        </template>
      </TableSimple>
    </div>
    <div v-if="exists" class="row center">
      <Message type="notfound robot">No existe ID de entrada</Message>
    </div>
  </div>
</template>
<script>
import FanButton from "@/components/Button";
import Finder from "@/components/Finder";
import Inputfield from "@/components/InputField";
import Loader from "@/components/Loader.vue";
import Message from "@/components/Message";
import Modal from "@/components/ModalContainer";
import Radiooption from "@/components/RadioOption";
import TableDetail from "@/components/TableDetails";
import TableSimple from "@/components/TableSimple";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "EntryFind",

  components: {
    FanButton,
    Finder,
    Inputfield,
    Loader,
    Message,
    Modal,
    Radiooption,
    TableDetail,
    TableSimple,
  },

  data() {
    return {
      idTyped: "",
      paramType: "name",
      paramValue: "",
      showUpdateBox: null,
    };
  },

  mounted() {
    this.getLatestEntries();
  },

  methods: {
    ...mapActions(["getLatestEntries"]),

    showBox(prod) {
      this.showUpdateBox = prod.product_id;
    },

    hideBox() {
      this.showUpdateBox = false;
    },
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

    updateItemLocation(entry) {
      console.log("entry", entry);
      this.$store.dispatch("updateEntryLocation", {
        action: "UPDATE_LOCATION",
        productId,
        location,
        newLocation,
        quantity,
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
          "Actualización",
          "Editor",
          "Cantidad",
          "Ubicación",
          "",
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