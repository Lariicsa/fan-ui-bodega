<template>
  <div class="container__box">
    <div class="row">
      <h4>Registrar nuevo conteo</h4>
    </div>
    <Loader v-show="loader" />
    <div class="col">
      <div class="row center">
        <Finder
          phText="Ingresa el Id de conteo"
          @search="getEntriesData(idTyped)"
          v-model="idTyped"
        />
      </div>
      <div v-if="showTable" class="col">
        <div class="row right entries__top">
          <h4>Conteo: #{{ countId }}</h4>
          <FanButton
            text="Detalles"
            ui="secondary"
            @btnClick="showCountingDetails()"
          />
        </div>
        <div class="row">
          <TableDetail
            :item="tabledata"
            :topCols="6"
            :cols="3"
            mainModifier="maxHeight"
          />
        </div>
        <div class="row between entries__setting">
          <Dropdown
            v-model="selectedStore"
            phName="Origen"
            variant="form"
            :options="stores"
            name="idStore"
            @onChange="setPreloadOrigin(selectedStore)"
          />
          <Dropdown
            v-model="selectedEmployee"
            phName="Asignado a"
            variant="form"
            :options="employeesList"
            name="idEmployee"
            @onChange="setAssignedTo(selectedEmployee)"
          />
          <FanButton
            text="Registrar entrada"
            :ui="isAllFilled ? 'primary' : 'disabled'"
            @btnClick="loadEntries()"
          />
        </div>
      </div>
    </div>
    <div class="row">
      <Modal :showBox="showDetails" @closeModal="closeModal()">
        <div class="box__full">
          <TableSimple :item="tableDataDetails" :cols="7" />
        </div>
      </Modal>
    </div>

    <div v-if="notFound" class="row md center entry__row">
      <Message type="notfound robot" :showmsg="notFound">
        Conteo no encontrado
      </Message>
    </div>
  </div>
</template>

<script>
import Dropdown from "@/components/Dropdown";
import FanButton from "@/components/Button";
import Finder from "@/components/Finder";
import Message from "@/components/Message";
import Modal from "@/components/ModalContainer";
import RadioOption from "@/components/RadioOption";
import TableDetail from "@/components/TableDetails";
import TableSimple from "@/components/TableSimple";
import Loader from "@/components/Loader.vue";
import storesData from "@/Mucks/stores";
import employees from "@/Mucks/employees";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Home",

  components: {
    Dropdown,
    FanButton,
    Finder,
    Loader,
    Message,
    Modal,
    RadioOption,
    TableDetail,
    TableSimple,
  },

  data() {
    return {
      idTyped: "",
      storesData: storesData.tiendas,
      selectedStore: "",
      employeesList: employees.names,
      selectedEmployee: "",
      showDetails: false,
      setActionType: "",
    };
  },

  created() {
    let ls = localStorage.getItem("jwt");
    if (ls === null) {
      localStorage.setItem(
        "jwt",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2ZTdjNzc3MS1lYWY2LTRlNWUtOTJmYy01YTA3NGQ2OGM0MWEiLCJlbWFpbCI6Im5hdGhhbmllbEBmYW50YXN0aWNvY29taWMuY29tIiwicm9sZSI6ImVtcGxveWVlIiwiaXNzIjoiZmFudGFzdGljbyBhcGkiLCJpYXQiOjE2MzQyMzE3MzJ9.jaSitYOtnXQRAYgNcYXbnj3bep1fgaE6uelV3o2G95k"
      );
    }
  },

  async mounted() {
    await this.showTable;
  },

  methods: {
    ...mapActions([
      "setPreloadOrigin",
      "setAssignedTo",
      "loadPreloadFromCounting",
    ]),

    showCountingDetails() {
      this.showDetails = true;
    },

    closeModal() {
      this.showDetails = false;
    },

    getEntriesData(typed) {
      this.$store.dispatch("getItemsCountData", typed).then(() => {
        this.$store.dispatch("getCountingDetail", typed);
      });
    },

    loadEntries() {
      this.$store
        .dispatch("loadPreloadFromCounting", {
          countId: this.countId,
          type: "ENTRADA",
          fromTo: this.fromTo,
          assignedTo: this.assignedTo,
        })
        .then(() => {
          if (this.status) {
            this.$router.push({
              name: "PreloadSuccess",
              params: { preloadId: this.countId },
            });
            setTimeout(() => {
              this.$store.commit("FETCH_LOADER_STATUS", false);
              this.$store.commit("GET_COUNTING_DATA", null);
            }, 300);
          }
        });
    },
  },

  computed: {
    ...mapGetters([
      "countingDetails",
      "currentStatusResponse",
      "countingMainDetails",
    ]),

    showTable() {
      let status = this.currentStatusResponse;
      switch (status) {
        case 200:
          if (
            this.countingMainDetails == undefined ||
            this.countingMainDetails.length < 1
          ) {
            return false;
          }
          return true;
        case 500:
          return false;
      }
    },

    mainTableData() {
      return this.$store.state.preloads.countingData;
    },

    detailsData() {
      return this.$store.state.preloads.countingDataDetail;
    },

    tabledata() {
      const table = {
        topHead: ["Id de Conteo", "Fecha", "Descripción", "Total", "Autor", ""],
        topRows: this.mainTableData,
        head: ["clave", "Descripción", "Cantidad"],
        rows: this.detailsData,
      };
      return table;
    },

    tableDataDetails() {
      const table = {
        head: [
          "Cantidad",
          "Clave",
          "Descripción",
          "Editorial",
          "Línea",
          "Control",
          "Precio",
        ],
        rows: this.countingDetails,
      };
      return table;
    },

    loader() {
      return this.$store.state.preloads.loader;
    },

    stores() {
      let tiendas = this.storesData.map((item) => {
        return { value: item.nombre, text: item.nombre };
      });
      return tiendas;
    },

    countId() {
      if (this.$store.state.preloads.countingData != undefined) {
        return this.$store.state.preloads.countingData.count_id;
      }
    },
    fromTo() {
      return this.$store.state.preloads.entriesOrigin;
    },
    assignedTo() {
      return this.$store.state.preloads.assignedEmployee;
    },

    isAllFilled() {
      if (
        (this.selectedStore && this.selectedEmployee) !== "" &&
        this.mainTableData !== null
      ) {
        return true;
      } else {
        return false;
      }
    },

    status() {
      return this.$store.state.preloads.status;
    },

    errorResponse() {
      return this.$store.state.preloads.statusError;
    },

    statusResponse() {
      return this.$store.state.preloads.statusResponse;
    },

    notFound() {
      let status = this.errorResponse;
      switch (status) {
        case 400:
          return true;
        case 500:
          return true;
        case 200:
          if (
            this.countingMainDetails == undefined ||
            this.countingMainDetails.length < 1
          ) {
            return true;
          } else {
            return false;
          }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.uploader__button {
  margin: 3.2rem 0;
}

.tableDetail.maxHeight {
  max-height: 60rem;
}
</style>
