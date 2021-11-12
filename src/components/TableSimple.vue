<template>
  <div class="simpleTable">
    <div class="simpleTable__scrollable-in" :style="'min-width:' + tableWidth">
      <div
        :class="'simpleTable__header ' + 'cols' + cols"
        :style="'grid-template-columns: repeat(' + cols + ', 1fr)'"
      >
        <div
          v-for="(col, index) in item.head"
          :class="'simpleTable__cell-head ' + 'cols' + cols"
          :key="index"
        >
          {{ col }}
        </div>
      </div>

      <div class="simpleTable__scrollable">
        <div
          :class="'simpleTable__row ' + 'cols' + cols + ' ' + modifier"
          :style="'grid-template-columns: repeat(' + cols + ', 1fr)'"
          v-for="(row, i) in item.rows"
          :key="i"
          @click.stop="rowClick(row)"
        >
          <slot v-bind:nrow="row"></slot>
          <div
            v-for="(col, n) in columns"
            :class="
              'simpleTable__cell ' +
              'cols' +
              cols +
              ' ' +
              colmodifier +
              n +
              ' ' +
              row[col]
            "
            :key="n"
            v-html="
              `<div class='simpleTable__cell-in'>` + col + '</div>' + row[col]
            "
          ></div>
        </div>
        <div class="simpleTable__row">
          <slot name="extraRow"></slot>
        </div>
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
    modifier: {
      type: String,
    },
    colmodifier: {
      type: String,
    },
    colExceptions: {
      type: String,
      default: "",
    },
    tableWidth: {
      type: String,
      default: "100%",
    },
  },

  mounted() {
    if (this.item == undefined) {
      this.item;
      this.columns;
    }
  },

  methods: {
    rowClick(index) {
      this.$emit("rowClick", index);
    },
  },

  computed: {
    columns: function columns() {
      if (this.item.rows.length === 0) {
        return [];
      }
      const cols = Object.keys(this.item.rows[0]);

      let finalcols = cols.filter((ele) => {
        return ![this.colExceptions].includes(ele);
      });

      return finalcols;
    },

    cellWidth() {
      let width = (100 / this.cols) * 100;
      return width;
    },
  },
};
</script>
