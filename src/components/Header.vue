<template>
  <header class="fHeader" :style="width">
    <div class="fHeader__top">
      <div class="fHeader__top-right">
        <strong>Hola, Admin</strong>
      </div>
    </div>
  </header>
</template>
<script>
import Burger from "./Burger.vue";
export default {
  name: "Header",

  props: ["width"],

  components: {
    Burger,
  },
};
</script>
