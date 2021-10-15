<template>
  <div class="container__box">
    <h3>Precarga registrada</h3>
    <div class="row">
      <p>
        El conteo <strong>{{ preloadId }}</strong> se ha registrado con éxito
      </p>
      <br />
      <p>
        El ID de la precarga es:
        <strong
          ><router-link
            :to="{
              name: 'PreloadsFind',
              params: { preloadId: currentPreloadId },
            }"
            >{{ currentPreloadId }}</router-link
          ></strong
        >.
      </p>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "PreloadSuccess",
  props: {
    preloadId: {
      required: true,
    },
  },

  computed: {
    ...mapGetters(["currentPreloadId"]),
  },
};
</script>