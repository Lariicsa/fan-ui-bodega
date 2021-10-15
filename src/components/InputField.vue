<template>
  <div class="textfield" :class="showError ? 'error' : ''">
    <div class="textfield__title" v-if="titleLabel">{{ titleLabel }}</div>
    <label
      v-show="phName"
      :class="this.value && titleLabel == undefined ? 'filled' : ''"
      :for="name"
      >{{ phName }}</label
    >
    <input
      :name="name"
      :type="type"
      :disabled="disabled"
      :class="showError ? 'error' : 'hide'"
      :placeholder="placeholder"
      ref="input"
      :value="value"
      @input="updateValue()"
      @keyup="onKeyUp()"
      @keyup.enter="onKeyUpEnter()"
      @blur="onBlur()"
      :maxlength="maxlength"
    />
    <div :class="showError ? `textfield__${typemsg}` : 'hide'">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "input-field",
  props: [
    "titleLabel",
    "placeholder",
    "type",
    "typemsg",
    "showError",
    "errorLabel",
    "value",
    "name",
    "disabled",
    "phName",
    "autofocus",
    "maxlength",
  ],

  mounted() {
    if (this.autofocus) this.$refs.input.focus();
  },
  methods: {
    btnAdd() {
      this.$emit("btnAdd");
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
