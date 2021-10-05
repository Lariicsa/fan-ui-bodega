<template>
  <div class="checksingle" @click="onClick" :id="id">
    <div class="checksingle__item">
      <div class="check" :class="{ ticked: this.optionSelected }"></div>
      <div class="checksingle__text"><slot></slot></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "check-single",
  model: {
    prop: "optionSelected",
    event: "click",
  },
  props: ["textOption", "optionSelected", "id"],

  methods: {
    onClick() {
      this.$emit("click", this.optionSelected);
    },
  },
};
</script>
<style lang="scss" scoped>
@import '@/scss/shared/_vars.scss';
.checksingle {
  display: flex;
  flex-direction: column;
  height: auto;
  width: auto;
  position: relative;
  &__item {
    color: $blackio;
    display: flex;
    position: relative;
    width: autorem;
    height: 4.8rem;
    z-index: 0;
    &:hover label {
      cursor: pointer;
    }
    & .check {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      border: 0.2rem solid $pale-grey-two;
      border-radius: 0.3rem;
      height: 2rem;
      width: 2rem;
      top: 0;
      left: 0;
      z-index: 2;
      &:after {
        content: "";
        width: 2.2rem;
        height: 2.2rem;
      }
      &.ticked {
        background: $aqua-blue;
        border: 0.2rem solid $aqua-blue;
        opacity: 1;
        &:after {
          background-position: center;
          background-size: contain;
          width: 2.2rem;
          height: 2.2rem;
        }
        &:hover {
          border: 0.2rem solid transparent;
        }
      }
      &:hover {
        cursor: pointer;
        border: 0.2rem solid $blackio;
      }
    }
  }

  &__text {
    font-size: $medium-size;
    width: calc(100% - 3.2rem);
    margin-left: 3.2rem;
    & > a {
      font-size: $medium-size;
      line-height: $regular-size + .4;
      color: $ocean-blue;
    }
  }

  &:focus {
    outline: none;
  }
}
</style>
