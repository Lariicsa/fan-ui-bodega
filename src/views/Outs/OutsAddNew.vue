<template>
  <div class="outs__form">
    <div class="row">
      <h3>Registrar Salida</h3>
    </div>
    <div class="row between outs__row">
      <div class="row">
        <Inputfield
          phName="Número de orden"
          name="orderId"
          type="number"
          v-model="outData.orderId"
          :showError="false"
          typemsg="error"
        />
      </div>
      <div class="row md">
        <Dropdown
          v-model="outData.selectedStore"
          phName="Origen"
          variant="form"
          :options="stores"
          name="idStore"
          @onChange="setPreloadOrigin(outData.selectedStore)"
        />
      </div>
      <div class="row md">
        <Dropdown
          v-model="outData.selectedEmployee"
          phName="Asignado a"
          variant="form"
          :options="employeesList"
          name="idEmployee"
          @onChange="setAssignedTo(outData.selectedEmployee)"
        />
      </div>
    </div>
    <div class="row">
      <hr />
    </div>
    <div class="row">
      <h4>Artículos</h4>
    </div>
    <div class="row between xcenter">
      <InputRegister txtBtnOk="Agregar" />
    </div>
    <div v-if="showTableItems" class="row outs__row">
      <TableSimple :item="tableDataDetails" :cols="3" />
      <div class="row right outs__row">
        <FanButton
          text="Registrar"
          ui="primary min"
          @btnClick="registerOut()"
        />
      </div>
    </div>
  </div>
</template>
<script>
import FanButton from "@/components/Button";
import Dropdown from "@/components/Dropdown";
import Inputfield from "@/components/InputField";
import InputRegister from "@/components/InputRegister";
import TableSimple from "@/components/TableSimple";
import storesData from "@/Mucks/stores";
import employees from "@/Mucks/employees";
import { mapGetters } from "vuex";
export default {
  name: "OutsAddNew",

  components: {
    FanButton,
    Dropdown,
    Inputfield,
    InputRegister,
    TableSimple,
  },

  data() {
    return {
      product: {
        idProd: "",
        quantity: null,
      },
      storesData: storesData.tiendas,
      employeesList: employees.names,
      outData: {
        orderId: null,
        selectedStore: "",
        selectedEmployee: "",
      },
    };
  },

  methods: {
    registerOut() {
      this.$store.dispatch("registerNewOut", {
        type: "SALIDA",
        assignedTo: this.outData.selectedEmployee,
        fromTo: this.outData.selectedStore,
        numOrder: this.outData.orderId,
        items: this.itemsOutCohorte,
      });

      console.log({
        type: "SALIDA",
        assignedTo: this.outData.selectedEmployee,
        fromTo: this.outData.selectedStore,
        numOrder: this.outData.orderId,
        items: this.itemsOutCohorte,
      });
    },

    setPreloadOrigin(origin) {
      this.$store.commit("SET_PRELOAD_ORIGIN", origin);
    },

    setAssignedTo(employee) {
      this.$store.commit("SET_PRELOAD_ASSIGNEDTO", employee);
    },
  },

  computed: {
    ...mapGetters(["itemsOutCohorte"]),
    tableDataDetails() {
      const table = {
        head: ["", "Cantidad", "Clave"],
        rows: this.itemsOutCohorte,
      };
      return table;
    },

    stores() {
      let tiendas = this.storesData.map((item) => {
        return { value: item.nombre, text: item.nombre };
      });
      return tiendas;
    },

    showTableItems() {
      if (this.itemsOutCohorte.length > 0) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>