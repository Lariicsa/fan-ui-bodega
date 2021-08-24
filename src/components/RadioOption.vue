<template>
  <div class="radioption" tabindex="0" @click="onClick" :id="id">
    <div class="radioption__item">
      <div
        class="check"
        :class="{ ticked: this.optionSelected === this.id }"
      ></div>
      <label v-if="this.textOption" :class="{checkBold: isBold}">{{ this.textOption }}</label>
      <div
        v-else
        :class="
          imgclass ? 'radioption__image ' + imgclass : 'radioption__image'
        "
      ></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "radio-option",
  model: {
    prop: "optionSelected",
    event: "click",
  },
  props: ["textOption", "optionSelected", "id", "imgclass", "isBold"],
  methods: {
    onClick() {
      this.$emit("click", this.id);
    },
  },
};
</script>