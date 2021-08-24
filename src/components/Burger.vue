<template>
  <div class="fBurger" @click="toggle()" :class="{ cross: isOpen }">
    <span></span>
    <span></span>
    <span></span>
    <div class="fBurger__bg" :class="{ open: isOpen }"></div>
    <nav class="fBurger__menu" :class="{ open: isOpen }">
      <slot></slot>
    </nav>
  </div>
</template>

<script>
export default {
  name: "fBurger",
  data() {
    return {
      isOpen: false
    };
  },
  methods: {
    toggle: function() {
      this.isOpen = !this.isOpen;
    }
  }
};
</script>
