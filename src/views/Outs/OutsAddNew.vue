<template>
  <div class="outs__form">
    <Message
      :showmsg="showMessage"
      type="infotext"
      :showClose="true"
      @clicMsg="closeWarning()"
      ><p class="advice">
        {{ messageResponseText }}:
        <br />
        {{ NotEnough.toString() }}
      </p></Message
    >
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
    </div>
    <div class="row">
      <h4>Artículos</h4>
    </div>
    <div class="row between xcenter">
      <InputRegister txtBtnOk="Agregar" />
    </div>
    <div class="row">
      <hr />
    </div>
    <div class="row outs__row">
      <div v-if="showTableItems" class="container__box">
        <TableSimple :item="tableDataDetails" :cols="4">
          <template v-slot:default="slotProps">
            <div class="tableDetail__cell cols4">
              <FanButton
                ui="delete"
                @btnClick="removeItem(slotProps.nrow.index)"
              />
            </div>
          </template>
        </TableSimple>
      </div>
    </div>
    <div v-show="showTableItems" class="row between xcenter">
      <div class="row md">
        <Dropdown
          v-model="outData.selectedStore"
          phName="Destino"
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
import Loader from "@/components/Loader";
import Message from "@/components/Message";
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
    Loader,
    Message,
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
      showMessage: false,
    };
  },

  methods: {
    registerOut() {
      this.$store
        .dispatch("registerNewOut", {
          type: "SALIDA",
          assignedTo: this.outData.selectedEmployee,
          fromTo: this.outData.selectedStore,
          numOrder: this.outData.orderId,
          items: this.itemsOutCohorte,
        })
        .then(() => {
          if (this.currentPreloadOutstatus === true) {
            this.$router.push({
              name: "OutsSuccess",
            });
          } else {
            this.showMessage = true;
          }
        });
    },

    removeItem(item) {
      this.$store.commit("REMOVE_OUT_ITEM", item);
      console.log(item);
    },

    setPreloadOrigin(origin) {
      this.$store.commit("SET_PRELOAD_ORIGIN", origin);
    },

    setAssignedTo(employee) {
      this.$store.commit("SET_PRELOAD_ASSIGNEDTO", employee);
    },

    closeWarning() {
      this.$store.commit("FETCH_PRELOAD_OUT_STATUS", false);
    },
  },

  computed: {
    ...mapGetters([
      "itemsOutCohorte",
      "currentPreloadOutstatus",
      "messageResponseText",
      "issuesInCohorte",
    ]),
    tableDataDetails() {
      const table = {
        head: ["", "", "Clave", "Cantidad"],
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

    NotEnough() {
      if (this.issuesInCohorte != undefined) {
        let items = this.issuesInCohorte.map((item) => {
          return item.product_id;
        });
        return items.flat();
      }
    },
  },
};
</script>