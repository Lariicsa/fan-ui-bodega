<template>
  <div class="container__box">
    <div class="row">
      <h4>Entradas</h4>
    </div>
    <div class="row">
      <Finder
        phText="Ingresa el Id de precarga"
        @search="getEntrieInfo(idTyped)"
        v-model="idTyped"
      />
      <TableSimple
        :item="tableDataDetails"
        :cols="9"
        @rowClick="goToDetail($event)"
      />
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import Finder from "@/components/Finder";
import Loader from "@/components/Loader.vue";
import TableSimple from "@/components/TableSimple.vue";
export default {
  name: "EntriesAll",

  components: {
    Finder,
    Loader,
    TableSimple,
  },

  data() {
    return {
      itemData: "",
    };
  },
  mounted() {
    this.getAllPreloads();
  },

  methods: {
    ...mapActions(["getAllPreloads"]),

    goToDetail(index) {
      this.$router.push({
        name: "EntryFind",
        params: { entryId: index.preload_id },
      });
    },
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