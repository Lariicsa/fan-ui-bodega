<template>
  <div class="base-pagination">
    <BaseButton :disabled="isPreviousButtonDisabled" @click.native="previousPage">&#60;</BaseButton>

    <BasePaginationTrigger
      v-for="paginationTrigger in paginationTriggers"
      :class="{
        'base-pagination__description--current':
          paginationTrigger === currentPage,
      }"
      :key="randomk"
      :pageNumber="paginationTrigger"
      class="base-pagination__description"
      @loadPage="onLoadPage"
    />

    <BaseButton :disabled="isNextButtonDisabled" @click.native="nextPage">&#62;</BaseButton>
  </div>
</template>

<script>
import BaseButton from "./BaseButton";
import BasePaginationTrigger from "./BasePaginatorTrigger";

export default {
  components: {
    BaseButton,
    BasePaginationTrigger
  },

  data() {
    return {
      randomk: this.randomKey
    };
  },

  props: {
    currentPage: {
      type: Number,
      required: true,
      default: 0
    },

    pageCount: {
      type: Number,
      required: true
    },

    visiblePagesCount: {
      type: Number,
      default: 5
    }
  },

  computed: {
    randomKey() {
      return Math.floor(Math.random() * 10);
    },
    isPreviousButtonDisabled() {
      return this.currentPage === 1;
    },

    isNextButtonDisabled() {
      return this.currentPage === this.pageCount;
    },

    paginationTriggers() {
      const currentPage = this.currentPage;
      const pageCount = this.pageCount;
      const visiblePagesCount = this.visiblePagesCount;
      const visiblePagesThreshold = Math.ceil((visiblePagesCount - 2) / 2);
      const pagintationTriggersArray = Array(this.visiblePagesCount - 1).fill(
        0
      );

      if (currentPage <= visiblePagesThreshold + 1) {
        pagintationTriggersArray[0] = 1;
        const pagintationTriggers = pagintationTriggersArray.map(
          (paginationTrigger, index) => {
            return pagintationTriggersArray[0] + index;
          }
        );
        pagintationTriggers.push(pageCount);
        return pagintationTriggers.slice(0, pageCount);
      } else if (currentPage >= pageCount - visiblePagesThreshold + 1) {
        const pagintationTriggers = pagintationTriggersArray.map(
          (paginationTrigger, index) => {
            return pageCount - index;
          }
        );
        pagintationTriggers.reverse().unshift(1);
        return pagintationTriggers;
      }

      pagintationTriggersArray[0] = currentPage - visiblePagesThreshold + 1;
      const pagintationTriggers = pagintationTriggersArray.map(
        (paginationTrigger, index) => {
          return pagintationTriggersArray[0] + index;
        }
      );

      pagintationTriggers.unshift(1);
      pagintationTriggers[pagintationTriggers.length - 1] = pageCount;
      return pagintationTriggers;
    }
  },

  methods: {
    nextPage() {
      this.$emit("nextPage");
    },

    onLoadPage(value) {
      this.$emit("loadPage", value);
    },

    previousPage() {
      this.$emit("previousPage");
    }
  }
};
</script>

<style lang="scss">
@import '@/scss/shared/_vars.scss';
.base-pagination {
  border: 0.1rem solid $light-blue-grey;
  border-radius: $radius;
  display: flex;
  justify-content: center;
  align-items: center;

  &__description {
    display: flex;
    align-items: center;
    border: 0;
    border-left: 0.1rem solid $light-blue-grey;
    justify-content: center;
    margin: 0;
    font-size: $medium-size;
    font-weight: $regular;
    color: $light-blue-grey;

    &--current {
      background-color: $aqua-blue;
      border-radius: 0;
      border-bottom: 0;
      border-top: 0;
      color: $white;
      cursor: default;
    }
  }

  .arrow-left {
    transform: rotateZ(180deg);
  }
}
</style>
