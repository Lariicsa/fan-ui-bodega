<template>
  <div class="container__box">
    <Loader v-show="loader" />
    <div class="col">
      <div class="row between">
        <div class="row md">
          <Finder
            phText="Encuentra un artículo"
            @search="getEntriesData(idTyped)"
            v-model="idTyped"
          />
        </div>
        <div class="row sm between">
          <RadioOption
            v-model="SelectedFilter"
            textOption="Por clave"
            id="clave1"
            @click="selectPaymentType('clave1')"
          />
          <RadioOption
            v-model="SelectedFilter"
            textOption="Por nombre"
            id="nombre2"
            @click="selectPaymentType('nombre2')"
          />
        </div>
      </div>
      <div class="col">
        <h4>Conteo: #63370</h4>
        <div class="row">
          <TableDetail :item="tabledata" :topCols="6" :cols="3" />
        </div>
        <div class="row between">
          <Dropdown
            v-model="selectedStore"
            phName="Origen"
            variant="normal"
            :options="stores"
            name="idStore"
            @onChange="setEntrieOrigin(selectedStore)"
          />
          <Dropdown
            v-model="selectedEmployee"
            phName="Asignado a"
            variant="normal"
            :options="employeesList"
            name="idEmployee"
            @onChange="setAssignedTo(selectedEmployee)"
          />
           <FanButton text="Registrar entrada" ui="disabled" :isSubmit="true" />
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
      sections: [
        {
          icon: "./src/assets/img/icons/orders.svg",
          text: "Banner",
          path: "/banner",
          name: "banner",
        },
        {
          icon: "./src/assets/img/icons/products.svg",
          text: "Bolsa de trabajo",
          path: "#3",
          name: "jobs",
          children: [
            {
              icon: "now-ui-icons files_paper",
              text: "Nested 1 ",
              path: "/products",
            },
            {
              icon: "now-ui-icons files_paper",
              text: "Nested 2",
              path: "/categories",
            },
            {
              icon: "now-ui-icons location_bookmark",
              text: "Nested 3",
              path: "/attribute-sets",
            },
          ],
        },
        {
          icon: "./src/assets/img/icons/clients.svg",
          text: "Sucursales",
          path: "#3",
          name: "branches",
        },
        {
          icon: "./src/assets/img/icons/marketing.svg",
          text: "Contacto",
          path: "#4",
          name: "contact",
        },
        {
          icon: "./src/assets/img/icons/reports.svg",
          text: "Pedidos anticipados",
          path: "#5",
          name: "early",
        },
        {
          icon: "./src/assets/img/icons/settings.svg",
          text: "Pedidos entre sucursales",
          path: "#6",
          name: "between",
        },
        {
          icon: "./src/assets/img/icons/integrations.svg",
          text: "Preguntas frecuentes",
          path: "#7",
          name: "faqs",
        },
      ],
      idTyped: "",
      SelectedFilter: "",

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
    ...mapActions(["setEntrieOrigin", "setAssignedTo"]),
    selectPaymentType(filter) {
      console.log("filter", filter);
    },

    getEntriesData(typed) {
      this.$store.dispatch("getEntriesCountData", typed);
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
  },
};
</script>
<style lang="scss" scoped>
.uploader__button {
  margin: 3.2rem 0;
}
</style>
