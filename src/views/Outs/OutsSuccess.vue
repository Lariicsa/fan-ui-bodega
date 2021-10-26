<template>
  <div class="row md center">
    <h3>Precarga Registrada</h3>
    <Message :showmsg="true" type="infotext">
      <p class="advice">
        La orden <strong>{{ preloadId }}</strong> se ha registrado con éxito.
        <br /><br />
        <br />
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
    </Message>
  </div>
</template>
<script>
import Message from "@/components/Message";
import { mapGetters } from "vuex";
export default {
  name: "OutsSuccess",
  components: {
    Message,
  },
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