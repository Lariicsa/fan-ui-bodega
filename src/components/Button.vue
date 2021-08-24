<template>
  <button
    v-if="isSubmit"
    @click="btnClick"
    formData.action="/submit"
    :type="type"
    :class="ui ? 'btn__' + ui : 'btn__primary'"
  >
    {{ text }}
  </button>
  <div v-else @click="btnClick" :class="ui ? 'btn__' + ui : 'btn__primary'">
    {{ text }}
  </div>
</template>
<script>
export default {
  name: "btn-fc",
  props: ["text", "type", "disabled", "ui", "isSubmit"],
  methods: {
    btnClick() {
      this.$emit("btnClick");
    },
  },
};
</script>
