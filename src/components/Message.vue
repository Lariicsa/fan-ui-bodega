<template>
  <div :class="'message__' + type">
    <p>
      <slot></slot>
      <span class="message__emoji" v-html="emoji"></span>
    </p>
  </div>
</template>
<script>
export default {
  name: "message",
  props: ["text", "type"],

  computed: {
    emoji: function () {
      const exploid = ` &#129327;`;
      const neutral = ` &#128528;`;
      const robot = ` &#129302;`;
      const smile = ` &#128515;`;
      const surprise = ` &#128551;`;

      if (this.type.includes("neutral")) {
        return neutral;
      } else if (this.type.includes("explode")) {
        return exploid;
      } else if (this.type.includes("robot")) {
        return robot;
      } else if (this.type.includes("smile")) {
        return smile;
      } else if (this.type.includes("surprise")) {
        return surprise;
      }
    },
  },
};
</script>
