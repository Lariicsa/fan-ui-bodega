<template>
  <div
    class="checkToggle"
    tabindex="0"
    @click="onClick"
    :id="id"
  >
    <div class="checkToggle__item">
      <label>{{ this.textOption }}</label>
      <div class="check" :class="{'ticked' : this.optionSelected === this.textOption}"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "checkOption",
  model: {
    prop: "optionSelected",
    event: "click"
  },
  props: ["textOption", "optionSelected", "id"],
  methods: {
    onClick () {
      this.$emit('click', this.textOption);
      console.log(this.textOption);
		}
  }
};
</script>
<style lang="scss" scoped>
.checkToggle {
  display: flex;
  flex-direction: column;
  height: auto;
  width: auto;
  position: relative;

  &:last-child {
    border-bottom: none;
  }
  &__item {
    color: $blackio;
    display: flex;
    position: relative;
    width: 100%;
    height: auto;
    z-index: 0;
    &:hover label {
      cursor: pointer;
    }
    & > label {
      display: block;
      position: relative;
      color: $blackio;
      font-size: $regular-size;
      line-height: 5.6rem;
      padding: 0rem 0rem 0rem 7.2rem;
      margin: 0 2rem;
      width: 100%;
      height: 100%;
      z-index: 9;
      cursor: pointer;
    }
    & .check {
      display: flex;
      position: absolute;
      background-color: $white;
      border: 0.2rem solid $pale-grey-two;
      border-radius: $radius;
      height: 4.4rem;
      width: 4.4rem;
      top: 0.9rem;
      left: 3rem;
      z-index: 2;
      &:after {
        content: "";
        width: 2.2rem;
        height: 0.7rem;
        border-radius: 0.2rem;
        position: absolute;
        top: 34%;
        left: 22%;
        opacity: 0;
        transform: rotate(-54deg);
      }
      &.ticked {
        background-color: $aqua-blue;
        border: 0.3rem solid $pale-grey-two;
        opacity: 1;
        &:after {
          background: transparent;
          border: 0.3rem solid $white;
          border-top: none;
          border-right: none;
          opacity: 1;
        }
      }
    }
  }

  &:focus {
    outline: none;
  }
}
</style>