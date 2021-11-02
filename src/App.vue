<template>
  <div id="app" class="space">
    <div class="wrapper">
      <Header :modifier="isOpen ? 'opened' : 'closed'" />
      <div class="container__main">
        <div :class="isOpen ? 'container__in' : 'container__in-full'">
          <Sidebar @btnClick="expandMenu" :modifier="{ opened: isOpen }">
            <MenuItems :items="sidebarMenu" @logout="logout()" />
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
    this.sidebarMenu;
  },

  methods: {
    expandMenu() {
      this.isOpen = !this.isOpen;
    },

    logout() {
      this.$store.dispatch("logOut").then(() => {
        setTimeout(() => {
          this.$router.push({
            name: "Login",
          });
        }, 500);
      });
    },
  },
};
</script>
