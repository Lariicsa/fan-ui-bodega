<template>
  <div class="simpleTable">
    <div class="simpleTable__scrollable-in">
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
          :class="'simpleTable__row ' + 'cols' + cols + ' '+ modifier"
          :style="'grid-template-columns: repeat(' + cols + ', 1fr)'"
          v-for="(row, i) in item.rows"
          :key="i"
          @click="rowClick(row)"
        >
          <div
            v-for="(col, n) in columns"
            :class="'simpleTable__cell ' + 'cols' + cols+ ' '+colmodifier+n+' '+row[col]"
            :key="n * 3.2 + 1"
            v-html="
              `<div class='simpleTable__cell-in'>` + col + '</div>' + row[col]
            "
          ></div>
        </div>
        <div class="simpleTable__row">
          <slot></slot>
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
      type: String
    },
    colmodifier: {
      type: String
    }
  },

  methods: {
    rowClick(index) {
     this.$emit("rowClick", index)
     console.log(index);
    }
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
