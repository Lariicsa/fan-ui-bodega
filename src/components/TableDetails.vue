<template>
  <div class="tableDetail">
    <div
      :class="'tableDetail__top ' + 'cols' + topCols"
      :style="'grid-template-columns: repeat(' + topCols + ', 1fr)'"
    >
      <div
        v-for="(col, index) in item.topHead"
        :class="'tableDetail__cell-head ' + 'cols' + topCols"
        :key="index"
      >
        {{ col }}
      </div>
    </div>

    <div class="tableDetail__bottom">
      <div class="tableDetail__scrollable-in">
        <div
          :class="'tableDetail__header ' + 'cols' + cols"
          :style="'grid-template-columns: repeat(' + cols + ', 1fr)'"
        >
          <div
            v-for="(col, index) in item.head"
            :class="'tableDetail__cell-head ' + 'cols' + cols"
            :key="index"
          >
            {{ col }}
          </div>
        </div>

        <div class="tableDetail__scrollable">
          <div
            :class="'tableDetail__row ' + 'cols' + cols + ' ' + modifier"
            :style="'grid-template-columns: repeat(' + cols + ', 1fr)'"
            v-for="(row, i) in item.rows"
            :key="i"
            @click="rowClick(row)"
          >
            <div
              v-for="(col, n) in columns"
              :class="
                'tableDetail__cell ' +
                'cols' +
                cols +
                ' ' +
                colmodifier +
                n +
                ' ' +
                row[col]
              "
              :key="n * 3.2 + 1"
              v-html="
                `<div class='tableDetail__cell-in'>` + col + '</div>' + row[col]
              "
            ></div>
          </div>
          <div class="tableDetail__row">
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "TableDetail",

  props: {
    item: {
      type: Object,
    },
    cols: {
      type: Number,
    },
    topCols: {
      type: Number,
    },
    modifier: {
      type: String,
    },
    colmodifier: {
      type: String,
    },
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
      return Object.keys(this.item.rows[0]);
    },

    cellWidth() {
      let width = (100 / this.cols) * 100;
      return width;
    },
    topCellWidth() {
      let width = (100 / this.topCols) * 100;
      return width;
    },
  },
};
</script>