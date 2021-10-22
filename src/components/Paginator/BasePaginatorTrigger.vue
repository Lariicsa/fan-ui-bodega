<template>
  <div class="base-pagination-trigger" @click="onClick">{{ pageNumber }}</div>
</template>

<script>
export default {
  props: {
    pageNumber: {
      type: Number,
      required: true
    }
  },

  methods: {
    onClick() {
      this.$emit("loadPage", this.pageNumber);
    }
  }
};
</script>

<style lang="scss">
@import '@/scss/shared/_vars.scss';
.base-pagination-trigger {
  background-color: transparent;
  border: 0.2rem solid $aqua-blue;
  transition: all 300ms ease;
  height: 3.4rem;
  width: 3.4rem;

  &:hover {
    color: $aqua-blue;
    cursor: pointer;
  }
}
</style>
