<template>
  <div class="col">
    <Loader v-show="loader" />
    <div class="row">
      <h4>
        Inventario <span>({{ entryDataResult.length }} resultados)</span>
      </h4>
    </div>

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
          textOption="Por clave"
          id="productKey"
          @click="selectParamKey(paramType)"
        />
        <Radiooption
          v-model="paramType"
          textOption="Por nombre"
          id="name"
          @click="selectParamKey(paramType)"
        />
        <Radiooption
          v-model="paramType"
          textOption="Por código de barras"
          id="barcode"
          @click="selectParamKey(paramType)"
        />
      </div>
      <hr />
    </div>

    <div class="row center">
      <TableSimple
        :item="tableDataDetails"
        :cols="10"
        colExceptions="index"
        tableWidth="100vw"
      >
        <template v-slot:default="slotProps">
          <div class="tableDetail__cell cols10">
            <FanButton
              text="Reubicar"
              ui="secondary"
              @btnClick="showBox(slotProps.nrow)"
            />
          </div>
          <Modal
            :showBox="showUpdateBox === slotProps.nrow.index"
            @closeModal="hideBox()"
          >
            <RelocateForm
              :item="slotProps.nrow"
              :formTitle="'Reubicar producto ' + slotProps.nrow.product_id"
              @actionForm="updateItemLocation"
              @close="hideBox()"
              class="box"
              btnOk="Reubicar"
              btnCancel="Cancelar"
            />
          </Modal>
        </template>
      </TableSimple>
    </div>
    <div v-if="exists" class="row center">
      <Message type="notfound robot">No existe ID de entrada</Message>
    </div>
    <Message
      :showmsg="messageUpdating"
      type="success fixed robot"
      :showClose="true"
      @clicMsg="closeMessage()"
      >Reubicación actualizada</Message
    >
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
import RelocateForm from "@/components/Forms/UpdatingLocationForm";
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
    RelocateForm,
    TableDetail,
    TableSimple,
  },

  data() {
    return {
      idTyped: "",
      paramType: "productKey",
      paramValue: "",
      showUpdateBox: null,
      messageUpdating: false,
    };
  },

  mounted() {
   this.getLatestEntries();
  },

  watch: {
    $route: 'getLatestEntries'
  },

  methods: {
    ...mapActions(["getLatestEntries"]),

    closeMessage() {
      this.$store.commit("FETCH_ENTRY_STATUS_RESPONSE", undefined);
    },

    showBox(prod) {
      console.log("prod", prod);
      this.showUpdateBox = prod.index;
    },

    selectParamKey(param) {
      this.findEntryBy(this.paramValue)
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

        case "name":
          this.$store.dispatch("findEntryByParam", `?name=${key}`);
          break;

        default:
          this.$store.dispatch("findEntryByParam", `?productKey=${key}`);
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
      if (entry.newLocation !== null && entry.newLocation !== "") {
        const itemData = {
          action: "UPDATE_LOCATION",
          productId: entry.productId,
          location: entry.location,
          newLocation: entry.newLocation,
          quantity: parseInt(entry.quantity),
        };
        this.$store.dispatch("updateEntryLocation", itemData).then(() => {
          this.hideBox();
          setTimeout(() => {
            this.getLatestEntries().then(() => {
              if (this.cEntryStatus == 200) {
                this.messageUpdating = true;
                setTimeout(() => {
                  this.messageUpdating = false;
                }, 3000);
              }
            });
          }, 500);
        });
      }
    },
  },

  computed: {
    ...mapGetters(["entryDataResult","cEntryStatus"]),
    loader() {
      return this.$store.state.preloads.loader;
    },

    showTable() {
      let status = this.$store.state.preloads.statusResponse;
      if (status == 200) {
        return true;
      } else {
        return false;
      }
    },

    tableDataDetails() {
      const table = {
        head: [
          "",
          "Ubicación",
          "Cantidad",
          "Clave",
          "Descripción",
          "Editorial",
          "Línea",
          "Control",
          "Actualización",
          "Editor",
        ],
        rows: this.entryDataResult,
      };
      return table;
    },

    exists() {
      let status = this.$store.state.preloads.statusResponse;
      if (status == 400) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>