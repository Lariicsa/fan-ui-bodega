<template>
  <div class="fanTable">
    <div class="fanTable__header" :class="'cols' + cols">
      <div
        v-for="(col, index) in item.head"
        class="fanTable__cell-head"
        :key="index"
      >
        {{ col }}
      </div>
    </div>

    <div class="fanTable__scrollable">
      <div class="fanTable__row" v-for="(row, i) in item.rows" :key="i">
        <div class="fanTable__cell check" :key="i * 4">
          <CheckFilter
            v-show="item.facturable[i]"
            :item="row"
            @changed="selectRow"
            :list="ticketsAddedToBilling"
            :showName="false"
          />
        </div>
        <div
          v-for="(col, n) in columns"
          class="fanTable__cell"
          :key="n * 3.2 + 1"
        >
          <div class="fanTable__cell-in">{{ col }}:</div>
          {{ row[col] }}
        </div>
        <div class="fanTable__cell view">
          <ButtonFan @btnClick="showDetails(i)" ui="secondary" text="Detalle" />
        </div>
        <Modal :showBox="showDetail === i" @closeModal="hideDetails()">
          <div class="box__full">
            <div class="cardPurchase__grid">
              <div class="row between cardPurchase__main">
                <span>Fecha: {{ item.rows[i].fecha }}</span>
                <span>Nota: {{ item.rows[i].name }}</span>
              </div>
              <div class="row between cardPurchase__main">
                <span>Artículos: {{ item.rows[i].articulos }}</span>
                <span>Total: {{ item.rows[i].importe }}</span>
              </div>
              <div class="job" v-for="det in item.detalle[i]" :key="det.name">
                <div class="cardPurchase__head">{{ det.artDescrip }}</div>
                <div class="cardPurchase__content">
                  <p>Cantidad: {{ det.cant }}</p>
                  <p>Precio de venta: ${{ det.importe }}</p>
                  <p>Importe: ${{ det.preciovta }}</p>
                </div>
              </div>
            </div>
          </div>
        </Modal>
        <hr :key="i + 'grd'" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import ButtonFan from "@/components/Button.vue";
import CheckFilter from "@/components/Filters/CheckFilter";
import Modal from "@/components/ModalContainer";
export default {
  name: "TableHistory",
  components: {
    ButtonFan,
    CheckFilter,
    Modal,
  },
  props: {
    item: {
      type: Object,
    },
    cols: {
      type: String,
    },
  },

  data() {
    return {
      showDetail: null,
    };
  },
  methods: {
    selectRow(ticket) {
      this.$store.commit("GET_TICKETS_TO_BILLING", ticket);
      //this.$store.dispatch("getTicketNumber", this.ticket);
      // this.ticket = ''
      // console.log("ticket", ticket);
    },
    showDetails(i) {
      this.showDetail = i;
    },

    hideDetails() {
      this.showDetail = false;
    },

    isActive() {
      return this.apurchasesTickets.indexOf(this.item.name) != -1;
    },
  },
  computed: {
    columns: function columns() {
      if (this.item.rows.length === 0) {
        return [];
      }
      return Object.keys(this.item.rows[0]);
    },
    ...mapGetters([
      "currentTicketsHistory",
      "ticketsAddedToBilling",
      "apurchasesTickets",
    ]),
  },
};
</script>
