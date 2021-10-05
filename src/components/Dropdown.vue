<template>
  <div class="dropdown__wrapper" :class="error ? 'error ' + variant : variant">
    <label :class="selected ? 'filled' : ''">{{ phName }}</label>
    <select
      :class="
        isDisabled ? 'dropdown disabled ' + variant : 'dropdown ' + variant
      "
      :name="name"
      v-model="selected"
      @change="onChange($event.target.value)"
    >
      <!-- <option v-if="selected" value="">{{ selected ? "" : "" }}</option> -->
      <option
        v-for="option in options"
        :value="option.value"
        :key="option.value"
      >
        {{ option.text }}
      </option>
    </select>
  </div>
</template>
<script>
export default {
  name: "DropField",

  props: [
    "phName",
    "id",
    "isDisabled",
    "options",
    "value",
    "name",
    "size",
    "error",
    "variant",
    "isNumber",
  ],

  methods: {
    onChange(value) {
      if (this.isNumber) {
        this.$emit("input", parseInt(value));
        this.$emit("onChange");
      } else {
        this.$emit("input", value);
        this.$emit("onChange");
      }
    },
  },

  computed: {
    selected: {
      get: function() {
        return this.value;
      },
      set: function() {},
    },
  },
};
</script>
