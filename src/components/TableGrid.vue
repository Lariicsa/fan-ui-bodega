<template>
  <div class="gridtable__wrapper">
    <div v-if="item" class="gridtable" :class="'cols' + cols">
      <div class="gridtable__flexwrap" :class="'cols' + cols">
        <div
          v-for="(col, index) in item.head"
          class="gridtable__item-head"
          :key="index"
        >
          {{ col }}
        </div>
      </div>
      <div class="gridtable__flexwrap" :class="'cols' + cols">
        <template v-for="(row, i) in item.rows">
          <div v-show="firstcol" class="gridtable__item">
            <span class="gridtable__icon remove" @click="btnDelete(i)"></span>
          </div>
          <div v-show="lastcol" class="gridtable__item">
            <CheckFilter
              :item="row"
              @changed="selectRow"
              :list="ticketsAddedToBilling"
              :showName="false"
            />
          </div>
          <div v-for="col in columns" class="gridtable__item">
            <div class="gridtable__item-in">{{ col }}:</div>
            {{ row[col] }}
          </div>
          <hr :key="i+'grd'" />
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import CheckFilter from "@/components/Filters/CheckFilter";
export default {
  name: "table-grid",
  components: {
    CheckFilter,
  },
  props: {
    item: {
      type: Object,
    },
    cols: {
      type: String,
    },
    firstcol: {
      type: Boolean,
      default: true,
    },
    lastcol: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    btnDelete(i) {
      this.$store.dispatch("removeTicket", i);
    },

    selectRow(ticket) {
      this.$store.commit("GET_TICKETS_TO_BILLING", ticket);
    },
  },
  computed: {
    columns: function columns() {
      if (this.item.rows.length === 0) {
        return [];
      }
      return Object.keys(this.item.rows[0]);
    },
    ...mapGetters(["currentTicketsHistory", "ticketsAddedToBilling"]),
  },
};
</script>
