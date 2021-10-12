<template>
  <div class="container__box">
    <h3>Success!</h3>
    <div class="row">
      <p>
        El conteo <strong>{{ countingId }}</strong> se ha registrado con éxito
      </p>
      <p>
        El ID de entrada es
        <strong
          ><router-link
            :to="{
              name: 'EntryLoaded',
              params: { entryId: currentEntryId },
            }"
            >{{ currentEntryId }}</router-link
          ></strong
        >.
      </p>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "EntrySuccess",
  props: {
    countingId: {
      required: true,
    },
  },

  computed: {
    ...mapGetters(["currentEntryId"]),
  },
};
</script>