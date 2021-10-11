<template>
  <div class="container__box">
    <Loader v-show="loader" />
    <div class="col">
      <div class="row between center">
        <Finder
          phText="Ingresa el Id de conteo"
          @search="getEntriesData(idTyped)"
          v-model="idTyped"
        />
      </div>
      <div v-show="mainTableData !== null" class="col">
        <div class="row between entries__top">
          <h4>Conteo: #{{ countId }}</h4>
          <FanButton
            text="Detalles"
            ui="secondary"
            @btnClick="showCountingDetails()"
          />
        </div>
        <div class="row">
          <TableDetail :item="tabledata" :topCols="6" :cols="3" />
        </div>
        <div class="row between entries__setting">
          <Dropdown
            v-model="selectedStore"
            phName="Origen"
            variant="form"
            :options="stores"
            name="idStore"
            @onChange="setEntrieOrigin(selectedStore)"
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
  </div>
</template>

<script>
import Dropdown from "@/components/Dropdown";
import FanButton from "@/components/Button";
import Finder from "@/components/Finder";
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
    };
  },

  created() {
    let ls = localStorage.getItem("jwt");
    if (ls === null) {
      localStorage.setItem(
        "jwt",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1YmMwNjg1OC01YzQ0LTQyZWMtOWExZC0xZGQ5NzYwYjBlZGIiLCJlbWFpbCI6Imxhcmlzc2FAZmFudGFzdGljb2NvbWljLmNvbSIsInJvbGUiOiJlbXBsb3llZSIsImlzcyI6ImZhbnRhc3RpY28gYXBpIiwiaWF0IjoxNjMyOTQ4MzI0fQ.JEZuHIGQqN9a_3ilEX4sYqOD1cfL1hatyhCOl4UswjQ"
      );
    }
  },

  mounted() {
    if (this.status) {
    }
  },

  methods: {
    ...mapActions([
      "setEntrieOrigin",
      "setAssignedTo",
      "loadEntrieFromCounting",
    ]),

    showCountingDetails() {
      this.showDetails = true;
    },

    closeModal() {
      this.showDetails = false;
    },

    selectPaymentType(filter) {
      console.log("filter", filter);
    },

    getEntriesData(typed) {
      this.$store.dispatch("getEntriesCountData", typed).then(() => {
        this.$store.dispatch("getEntriesCountDetail", typed);
      });
    },

    loadEntries() {
      console.log("clic");
      this.$store.dispatch("loadEntrieFromCounting", {
        countId: this.countId,
        type: "ENTRADA",
        fromTo: this.fromTo,
        assignedTo: this.assignedTo,
      });
    },
  },

  computed: {
    ...mapGetters(["countingDetails"]),
    mainTableData() {
      return this.$store.state.entries.countingData;
    },

    detailsData() {
      return this.$store.state.entries.countingDataDetail;
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
      return this.$store.state.entries.loader;
    },

    stores() {
      let tiendas = this.storesData.map((item) => {
        return { value: item.nombre, text: item.nombre };
      });
      return tiendas;
    },

    countId() {
      if (this.$store.state.entries.countingData != undefined) {
        return this.$store.state.entries.countingData.count_id;
      }
    },
    fromTo() {
      return this.$store.state.entries.entriesOrigin;
    },
    assignedTo() {
      return this.$store.state.entries.assignedEmployee;
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
      return this.$store.state.entries.status;
    },
  },
};
</script>
<style lang="scss" scoped>
.uploader__button {
  margin: 3.2rem 0;
}
</style>
