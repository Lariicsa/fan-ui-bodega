<template>
  <div class="container__box">
    <Loader v-show="loader" />
    <div class="col">
      <div class="row">
        <Finder
          phText="Encuentra un artículo"
          @search="getEntriesData(idTyped)"
          v-model="idTyped"
        />
      </div>
      <div v-show="mainTableData !== null" class="col">
        <h4>Conteo: #{{ countId }}</h4>
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
  </div>
</template>

<script>
import Dropdown from "@/components/Dropdown";
import FanButton from "@/components/Button";
import Finder from "@/components/Finder";
import Modal from "@/components/ModalContainer";
import RadioOption from "@/components/RadioOption";
import TableDetail from "@/components/TableDetails";
import Loader from "@/components/Loader.vue";
import storesData from "@/Mucks/stores";
import employees from "@/Mucks/employees";
import { mapActions } from "vuex";
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
  },
  data() {
    return {
      idTyped: "",
      storesData: storesData.tiendas,
      selectedStore: "",
      employeesList: employees.names,
      selectedEmployee: "",
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

  methods: {
    ...mapActions([
      "setEntrieOrigin",
      "setAssignedTo",
      "loadEntrieFromCounting",
    ]),
    selectPaymentType(filter) {
      console.log("filter", filter);
    },

    getEntriesData(typed) {
      this.$store.dispatch("getEntriesCountData", typed);
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
  },
};
</script>
<style lang="scss" scoped>
.uploader__button {
  margin: 3.2rem 0;
}
</style>
