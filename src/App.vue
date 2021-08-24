<template>
  <div id="app" class="space">
    <div class="wrapper">
      <Header
        :width="
          isOpen ? 'width: calc(100% - 24rem)' : 'width: calc(100% - 6.4rem)'
        "
      />
      <div class="container__main">
        <div :class="isOpen ? 'container__in' : 'container__in-full'">
          <Sidebar @btnClick="expandMenu" :modifier="{ opened: isOpen }">
            <MenuItems></MenuItems>
          </Sidebar>
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MenuItems from "@/components/MenuItems";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default {
  name: "app",

  components: {
    Header,
    Sidebar,
    MenuItems,
  },

  data() {
    return {
      isOpen: false,
    };
  },

  methods: {
    expandMenu() {
      this.isOpen = !this.isOpen;
      console.log("clic");
    },
  },
};
</script>
