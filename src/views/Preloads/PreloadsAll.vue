<template>
  <div class="container__box">
    <div class="row">
      <h4>
        Precargas <span>({{ currentPreloads.length }} resultados)</span>
      </h4>
    </div>
    <div class="row">
      <TableSimple
        :item="tableDataDetails"
        :cols="9"
        modifier="hasHover"
        colExceptions="status"
        @rowClick="goToDetail($event)"
      >
        <template v-slot:default="slotProps">
          <div class="tableDetail__cell cols9">
            <Label :type="slotProps.nrow.status" />
          </div>
        </template>
      </TableSimple>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import Label from "@/components/Label";
import TableSimple from "@/components/TableSimple.vue";
export default {
  name: "PreloadsAll",

  components: {
    Label,
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

    updateProdLocation() {
      this.$store.dispatch("setPreloadLocation");
    },

    updateProdStatus() {
      this.$store.dispatch("updatePreloadsStatus");
    },

    goToDetail(index) {
      this.$router.push({
        name: "PreloadsFind",
        params: { preloadId: index.preload_id },
      });
    },
  },

  computed: {
    ...mapGetters(["currentPreloads"]),

    tableDataDetails() {
      const table = {
        head: [
          "",
          "id",
          "Cantidad",
          "Desde",
          "Movimiento",
          "Editor",
          "Fecha",
          "Asignado a",
          "Status",
        ],
        rows: this.currentPreloads,
      };
      return table;
    },
  },
};
</script>