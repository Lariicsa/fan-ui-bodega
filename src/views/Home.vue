<template>
  <div class="container__box">
    <div class="col">
      <div class="row between">
        <div class="row md"><Finder phText="Encuentra un artículo" /></div>
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
        <h3>Conteo: #63370</h3>
        <div class="row">
          <TableDetail :item="tabledata" :cols="7" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import FanButton from "@/components/Button";
import Finder from "@/components/Finder";
import Modal from "@/components/ModalContainer";
import RadioOption from "@/components/RadioOption";
import TableDetail from "@/components/TableDetails";
import dataTable from "@/Mucks/products";
export default {
  name: "Home",

  components: {
    FanButton,
    Finder,
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

      SelectedFilter: "clave1",
      dataTable: dataTable.prodsin,
    };
  },

  methods: {
    selectPaymentType(filter) {
      console.log("filter", filter);
    },
  },

  computed: {
    ...mapGetters(["gtrFetchSlides"]),

    tabledata() {
      const table = {
        head: [
          "clave",
          "Título",
          "Editorial",
          "ingreso",
          "línea",
          "lugar",
          "precio",
        ],
        rows: this.dataTable,
      };
      return table;
    },
  },
};
</script>
<style lang="scss" scoped>
.uploader__button {
  margin: 3.2rem 0;
}
</style>
