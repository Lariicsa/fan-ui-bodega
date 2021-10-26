<template>
  <div class="row md center">
    <h3>Conteo registrado</h3>
    <Message :showmsg="true" type="infotext">
      <p class="advice">
        El conteo <strong>{{ countingId }}</strong> se ha registrado con éxito.
        <br /><br /><br />
        El ID de entrada es
        <strong
          ><router-link
            :to="{
              name: 'EntryFind',
              params: { entryId: currentPreloadId },
            }"
            >{{ currentPreloadId }}</router-link
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
  name: "EntrySuccess",
  components: {
    Message,
  },
  props: {
    countingId: {
      required: true,
    },
  },

  computed: {
    ...mapGetters(["currentPreloadId"]),
  },
};
</script>