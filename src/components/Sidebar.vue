<template>
  <div id="sidebar" class="fSidebar__container" :class="modifier">
    <img class="fSidebar__logo" src="../../public/favicon.png" :class="modifier"/>
    <div class="fSidebar__button" @click="btnClick"></div>
    <div class="fSidebar">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "Sidebar",

  props: ["modifier"],

  methods: {
    btnClick() {
      this.$emit("btnClick");
    },
  },
};
</script>
