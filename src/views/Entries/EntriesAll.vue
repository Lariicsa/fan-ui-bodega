<template>
  <div class="container__box">
 <div class="row">
   <h4>Entradas</h4>
   <p>{{itemData.preload_id}}</p>
 </div>
    <div class="row">
      <TableSimple :item="tableDataDetails" :cols="9" @rowClick="getDetails($event)" />
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import TableSimple from "@/components/TableSimple.vue";
export default {
  name: "EntriesAll",

  components: {
    TableSimple,
  },

  data() {
    return {
      itemData: ''
    }
  },
  mounted() {
    this.getAllPreloads();
  },

  methods: {
    ...mapActions(["getAllPreloads"]),
    getDetails(index){
      this.itemData = index
    }
  },

  computed: {
    ...mapGetters(["currentPreloads"]),

    tableDataDetails() {
      const table = {
        head: [
          "id",
          "Cantidad",
          "Desde",
          "Fecha",
          "Transacción",
          "Editor",
          "Asignado a",
          "#Orden",
          "Status",
        ],
        rows: this.currentPreloads,
      };
      return table;
    },
  },
};
</script>