<template>
  <header class="fHeader" :class="modifier">
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

  props: ["modifier"],

  components: {
    Burger,
  },
};
</script>
