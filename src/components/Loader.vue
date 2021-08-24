<template>
  <div :class="!bg ? 'loader__wrapper' : 'loader__wrapper nobg'">
    <div v-if="figure === 'rocket'" class="loader__out">
      <div :class="figure === 'rocket' ? 'loader' : 'hide'"></div>
      <div :class="figure"></div>
    </div>
    <div v-else-if="figure === 'dots'" :class="figure">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div v-else :class="figure"></div>
  </div>
</template>
<script>
export default {
  name: "loader",
  props: {
    bg: Boolean,
    figure: {
      type: String,
      default: "rocket",
    },
  },
};
</script>
