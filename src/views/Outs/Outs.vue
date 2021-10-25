<template>
  <div class="container__box">
    <router-view :key="$route.path" />
  </div>
</template>
<script>
export default {
  name: "Outs",
  computed: {
    currentPath() {
      return this.$route.name;
    },
  },
};
</script>