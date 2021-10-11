<template>
  <ul class="sidebar-items">
    <li
      v-for="(item, index) in items"
      @click="collapseItem(index, item)"
      :class="
        currentPath === item.path
          ? 'item selected ' + item.name
          : 'item ' + item.name
      "
      :key="index"
    >
      <router-link
        :class="currentPath === item.path ? 'selected ' + item.name : item.name"
        :to="item.path"
      >
        {{ item.text }}

        <transition name="slide-fade">
          <ul class="child-items" v-if="openedItems[index]">
            <li class="child-item" v-for="(child, x) in item.children" :key="x">
              <router-link
                :class="
                  currentPath === item.path
                    ? 'selected ' + item.name
                    : item.name
                "
                :to="child.path"
                @click.stop
              >
                {{ child.text }}
              </router-link>
            </li>
          </ul>
        </transition>
      </router-link>
    </li>
  </ul>
</template>
<script>
export default {
  name: "FMenuItems",

  props:{
    items: {
      type: Array
    }
  },

  data() {
    return {
      openedItems: {},
      selectedSub: "",
      userMenu: false,
      
    };
  },

  methods: {
    collapseItem(index, item) {
      if (item.children != null) {
        this.openedItems[index] = !this.openedItems[index];
        this.$forceUpdate();
      }
    },
  },

  computed: {
    currentPath() {
      return this.$route.path;
    },
    isInSection() {},
  },
};
</script>
