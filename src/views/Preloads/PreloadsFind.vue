<template>
  <div class="col">
    <Loader v-show="loader" />
    <h4>
      Buscar precarga <span>{{ currentResults }}</span>
    </h4>
    <div class="row between">
      <Finder
        phText="Ingresa el Id de precarga"
        @search="getPreloadInfo(idTyped)"
        v-model="idTyped"
      />
      <div v-if="showTable" class="row center entry__row">
        <TableSupport
          :item="tableData"
          :topCols="7"
          :cols="10"
          modifier="hasHover"
          colExceptions="final_location, status"
        >
          <template v-slot:firstRow="slotProps">
            <div class="tableDetail__cell cols10">
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
          <template v-slot:lastRow="otherProps">
            <div class="tableDetail__cell cols10">
              <Label :type="otherProps.lrow.status" />
            </div>
          </template>
        </TableSupport>
        <div class="row sm right entry__endrow">
          <FanButton
            :text="showButton.text"
            ui="primary"
            @btnClick="showButton.func"
          />
        </div>
      </div>
      <div v-if="exists" class="row center">
        <Message :showmsg="exists" type="notfound robot"
          >No existe ID de entrada</Message
        >
      </div>
      <div v-if="errorResponse == 400" class="row center">
        <Message
          :showmsg="true"
          type="warning fixed"
          :showClose="true"
          @clicMsg="closeWarning()"
          >{{ errorMessage }}</Message
        >
      </div>
    </div>
  </div>
</template>
<script>
import FanButton from "@/components/Button";
import Finder from "@/components/Finder";
import Inputfield from "@/components/InputField";
import Label from "@/components/Label";
import Loader from "@/components/Loader.vue";
import Message from "@/components/Message";
import TableDetail from "@/components/TableDetails";
import TableSimple from "@/components/TableSimple";
import TableSupport from "@/components/TableSupport";
import { mapGetters } from "vuex";
export default {
  name: "PreloadsFind",

  components: {
    FanButton,
    Finder,
    Inputfield,
    Label,
    Loader,
    Message,
    TableDetail,
    TableSimple,
    TableSupport,
  },

  props: {
    preloadId: {
      type: String,
    },
  },

  data() {
    return {
      idTyped: "",
      loadPreloadId: this.preloadId,
      lastButton: {
        text: "",
        func: null,
      },
    };
  },

  beforeMount() {
    this.$store.commit("FETCH_RESPONSE_STATUS", undefined);
    this.closeWarning();
  },

  mounted() {
    this.selectFunction();
    this.preloadDataDetails
  },

  methods: {
    closeWarning() {
      this.$store.commit("FETCH_RESPONSE_ERROR_STATUS", undefined);
    },

    arrangeOnRack() {
      this.$store
        .dispatch("updatePreloadsStatus", {
          newStatus: "acomodando",
          id: this.idTyped != "" ? this.idTyped : this.preloadId,
        })
        .then(() => {
          if (this.preloadId == "") {
            this.getPreloadInfo(this.idTyped);
          } else {
            this.getPreloadInfo(this.preloadId);
          }
        });
    },

    setToArranged() {
      this.$store
        .dispatch("updatePreloadsStatus", {
          newStatus: "acomodado",
          id: this.idTyped != "" ? this.idTyped : this.preloadId,
        })
        .then(() => {
          if (this.preloadId == "") {
            this.getPreloadInfo(this.idTyped);
          } else {
            this.getPreloadInfo(this.preloadId);
          }
        });
    },

    registerInInventory() {
      this.$store
        .dispatch("updatePreloadsStatus", {
          newStatus: "registrado en inventario",
          id: this.idTyped != "" ? this.idTyped : this.preloadId,
        })
        .then(() => {
          if (this.preloadId == "") {
            this.getPreloadInfo(this.idTyped);
          } else {
            this.getPreloadInfo(this.preloadId);
          }
        });
    },

    updateLocation(txt) {
      this.$store.dispatch("setPreloadLocation", txt);
    },

    selectFunction() {
      if (this.preloadId != undefined) {
        this.getPreloadInfo(this.preloadId);
      }
    },

    getPreloadInfo(entrieId) {
      this.$store.dispatch("getPreloaded", entrieId).then(() => {
        this.$store.dispatch("getPreloadDetail", entrieId);
      });
    },
  },

  computed: {
    ...mapGetters([
      "preloadDataResult",
      "preloadDataDetails",
      "currentStatus",
      "currentEntryStatus",
      "currentStatusResponse",
    ]),
    loader() {
      return this.$store.state.entries.loader;
    },

    errorResponse() {
      return this.$store.state.entries.statusError;
    },

    errorMessage() {
      return this.$store.state.entries.errorMessage;
    },

    showTable() {
      let status = this.currentStatusResponse;
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
          "Fecha",
          "Creado por",
          "Asignado a",
          "Status",
        ],
        topRows: this.preloadDataResult,
        head: [
          "Ubicación",
          "id",
          "Clave",
          "Descripción",
          "Editorial",
          "Línea",
          "Control",
          "Editor",
          "Actualización",
          "Status",
        ],
        rows: this.preloadDataDetails,
      };
      return table;
    },

    showButton() {
      let status = this.currentEntryStatus;

      switch (status) {
        case "asignado":
          return (this.lastButton = {
            text: "Acomodar en Rack",
            func: this.arrangeOnRack,
          });
        case "acomodando":
          return (this.lastButton = {
            text: "Finalizar Acomodo",
            func: this.setToArranged,
          });
        case "acomodado":
          return (this.lastButton = {
            text: "Registrar en Stock",
            func: this.registerInInventory,
          });
        case "registrado en inventario":
          return (this.lastButton = {
            text: "Reubicar",
            func: this.registerInInventory, //temporal
          });
        case undefined:
          return (this.lastButton = {
            text: "",
            func: this.registerInInventory, //temporal
          });
      }
    },

    exists() {
      let status = this.$store.state.entries.statusResponse;
      if (status == 400) {
        return true;
      } else {
        return false;
      }
    },

    currentResults() {
      if ([this.idTyped, this.preloadId].includes(undefined)) {
        return "";
      } else {
        if (this.preloadDataDetails !== undefined) {
          let lng = this.preloadDataDetails.length;
          return `${lng} Resultados`;
        }
      }
    },
  },
};
</script>
