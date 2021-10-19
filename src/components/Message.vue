<template>
  <div v-if="showmsg" :class="'message__' + type">
    <span v-show="showClose" class="message__close" @click="clicMsg"></span>
    <div :class="'text ' + align">
      <slot></slot>
      <span class="message__emoji" v-html="emoji"></span>
    </div>
  </div>
</template>
<script>
export default {
  name: "message",
  props: {
    text: {
      type: String,
    },
    type: {
      type: String,
      default: "Fixed info",
    },
    showClose: {
      type: Boolean,
      default: false,
    },
    showmsg: {
      type: Boolean,
      default: false,
    },
    align: {
      type: String,
      default: "center",
    },
  },

  data() {
    return {
      //timeoutid:null
    };
  },

  computed: {
    emoji: function() {
      const exploid = ` &#129327;`;
      const neutral = ` &#128528;`;
      const robot = ` &#129302;`;
      const smile = ` &#128515;`;
      const heart = ` &#128525;`;

      if (this.type.includes("neutral")) {
        return neutral;
      } else if (this.type.includes("explode")) {
        return exploid;
      } else if (this.type.includes("robot")) {
        return robot;
      } else if (this.type.includes("smile")) {
        return smile;
      } else if (this.type.includes("heart")) {
        return heart;
      }
    },
  },

  methods: {
    clicMsg() {
      this.$emit("clicMsg");
      console.log("clic");
      this.createTimeOut();
    },

    createTimeOut() {
      setTimeout(() => {
        this.showmsg = false;
        console.log("close");
      }, 4000);
    },
  },
};
</script>
