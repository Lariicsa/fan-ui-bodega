<template>
  <div class="container__box">
    <h4>Entrada 6df2e541-8592-480a-8c35-f1f14ebbcd44</h4>
    <div class="row between center">
      <Finder
        phText="Ingresa el Id de precarga"
        @search="getEntrieInfo(idTyped)"
        v-model="idTyped"
      />
    </div>
  </div>
</template>
<script>
import Finder from "@/components/Finder";
export default {
  name: "EntrieLoaded",

  components: {
    Finder,
  },

  data() {
    return {
      idTyped: "",
    };
  },

  methods: {
    getEntrieInfo(entrieId) {
      this.$store.dispatch("getPreloaded", entrieId);
    },
  },
};
</script>