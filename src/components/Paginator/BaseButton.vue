<template>
  <button :disabled="disabled" class="button">
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/scss/shared/_vars.scss';
.button {
  background-color: transparent;
  border: 0.1rem solid transparent;
  border-left: 0.1rem solid $light-blue-grey;
  border-radius: $radius;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $aqua-blue;
  outline: none;
  transition: all 300ms ease-in-out;
  height: 3.4rem;
  width: 3.4rem;
  text-decoration: none;
  position: relative;
  &:first-child {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-left: 0.1rem solid transparent;
  }
   &:last-child {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  svg {
    color: $aqua-blue;
  }
  &:hover {
    cursor: pointer;
  }
  &:active {
    background-color: $aqua-blue;
    border-radius: 0;
    background-color: transparent;
    border-radius: $radius;
    color: $white;
  }
  &[disabled] {
    border: 0.1rem solid transparent;
    color: $light-blue-grey;
    &:hover {
      cursor: default;
    }
  }
}
</style>
