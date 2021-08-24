<template>
  <div class="simpleTable">
    <div class="simpleTable__header">
      <div
        v-for="(col, index) in item.head"
        :class="'simpleTable__cell-head ' + 'cols' + cols"
        :key="index"
      >
        {{ col }}
      </div>
    </div>

    <div class="simpleTable__scrollable">
      <div class="simpleTable__row" v-for="(row, i) in item.rows" :key="i">
        <div
          v-for="(col, n) in columns"
          :class="'simpleTable__cell ' + 'cols' + cols"
          :key="n * 3.2 + 1"
          v-html="
            `<div class='simpleTable__cell-in'>` +
              col +
              '</div>' +
              row[col]
          "
        ></div>

        <hr :key="i + 'grd'" />
      </div>
      <div class="simpleTable__row">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "TableSimple",

  props: {
    item: {
      type: Object,
    },
    cols: {
      type: Number,
    },
  },

  computed: {
    columns: function columns() {
      if (this.item.rows.length === 0) {
        return [];
      }
      return Object.keys(this.item.rows[0]);
    },

    cellWidth() {
      let width = (100 / this.cols) * 100;
      return width;
    },
  },
};
</script>
