<template>
  <form @submit.prevent="search()" class="finder" :class="{ opened: isOpen }">
    <div
      @click="openFinder()"
      class="finder__bg"
      :class="{ opened: isOpen }"
    ></div>
    <span @click="openFinder()" class="finder-cross"></span>
    <input
      type="text"
      :placeholder="phText"
      ref="input"
      :value="value"
      @input="updateValue()"
      @keyup="onKeyUp()"
      @keyup.enter="onKeyUpEnter()"
      @blur="onBlur()"
    />
    <span
      @click="search()"
      class="finder-icon"
      :class="{ show: isOpen }"
    ></span>
    <span
      @click="openFinder()"
      class="finder-icon-mobile"
      :class="{ hide: isOpen }"
    ></span>
  </form>
</template>
<script>
export default {
  name: "finder",

  props: {
    textUrl: {
      type: String,
    },
    phText: String,
    textIn: String,
    value: String,
    autofocus: Boolean
  },

  data() {
    return {
      textTyped: this.textIn,
      isOpen: false,
    };
  },

  mounted() {
    if (this.autofocus) this.$refs.input.focus();
  },

  methods: {
    search() {
      this.$emit("search");
    },
    updateValue() {
      this.$emit("input", this.$refs.input.value);
    },
    onKeyUp() {
      this.$emit("keyup");
    },
    onKeyUpEnter() {
      this.$emit("keyupEnter");
    },
    onBlur() {
      this.$emit("onBlur");
    },
  },
};
</script>
