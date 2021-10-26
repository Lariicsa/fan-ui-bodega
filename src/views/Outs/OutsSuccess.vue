<template>
  <div class="container__box">
    <h3>Precarga registrada</h3>
    <div class="row">
      <p>
        La orden <strong>{{ preloadId }}</strong> se ha registrado con éxito
      </p>
      <br />
      <p>
        El ID de la precarga es:
        <strong
          ><router-link
            :to="{
              name: 'PreloadsFind',
              params: { preloadId: currentOutPreloadId },
            }"
            >{{ currentOutPreloadId }}</router-link
          ></strong
        >.
      </p>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "OutsSuccess",
  props: {
    preloadId: {
      required: true,
    },
  },

  computed: {
    ...mapGetters(["currentPreloadOutstatus", "currentOutPreloadId"]),
  },
};
</script>