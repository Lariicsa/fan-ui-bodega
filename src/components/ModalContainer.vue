<template>
  <div v-show="showBox" class="modal__wrap">
    <div class="modal__bg" @click.self="closeModal()">
      <div class="modal">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ModalContainer",
  props: {
    showBox: {
      type: Boolean,
      default: false,
    },
    message: {
      type: String,
    },
  },
  methods: {
    closeModal() {
      this.$emit("closeModal");
    },

    clickOkHandler() {
      console.log("Ok");
    },
  },
};
</script>
