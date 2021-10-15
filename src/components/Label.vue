<template>
  <div :class="'fLabel__' + type"></div>
</template>
<script>
export default {
  name: "fLabel",
  props: ["text", "type"],
};
</script>
