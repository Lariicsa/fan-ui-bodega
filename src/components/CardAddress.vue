<template>
  <div v-if="item" :id="item.id" class="adrscard" :class="modifier">
    <div v-show="showOption" class="adrscard__option">
      <slot name="option"></slot>
    </div>
    <div class="adrscard__data">
      <p>
        <strong v-show="showAlias">{{ item.alias || "Sin alias" }}</strong>
      </p>
      <p v-for="n in address" :key="n">{{ item.formato[n - 1] }}</p>
    </div>
    <div class="adrscard__buttons">
      <slot></slot>
    </div>
  </div>
  <div v-else class="adrscard" :class="modifier" @click="btnAdd">
    <div v-show="showOption" class="adrscard__option">
      <slot name="option"></slot>
    </div>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "address-card",
  props: {
    item: {
      type: Object,
    },
    modifier: String,
    id: String,
    showAlias: {
      type: Boolean,
      default: true,
    },
    showOption: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      br: "<br>",
    };
  },

  methods: {
    btnAdd() {
      this.$emit("btnAdd");
    },
  },

  computed: {
    address() {
      return this.item.formato.length;
    },
  },
};
</script>
