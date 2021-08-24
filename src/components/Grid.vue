<template>
  <div :class="`fgrid-${cols}`">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "FtscGrid",
  props: ["cols"]
};
</script>
