<template>
  <div id="app" class="space">
    <div class="wrapper">
      <Header
        :width="
          isOpen ? 'width: 100%' : 'width: calc(100% - 6.4rem)'
        "
      />
      <div class="container__main">
        <div :class="isOpen ? 'container__in' : 'container__in-full'">
          <Sidebar @btnClick="expandMenu" :modifier="{ opened: isOpen }">
            <MenuItems :items="sidebarMenu" />
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
import sidebarItems from "./Mucks/sidebar";

export default {
  name: "app",

  components: {
    Header,
    Sidebar,
    MenuItems,
  },

  data() {
    return {
      isOpen: true,
      sidebarMenu: sidebarItems.items,
    };
  },

  mounted() {
    this.sidebarMenu
    console.log(this.sidebarMenu);
  },

  methods: {
    expandMenu() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>
