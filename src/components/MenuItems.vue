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

  data() {
    return {
      openedItems: {},
      selectedSub: "",
      userMenu: false,
      items: [
        {
          icon: "./src/assets/img/icons/dashboard.svg",
          text: "Dashboard",
          path: "/",
          name: "dashboard",
        },
        {
          icon: "./src/assets/img/icons/orders.svg",
          text: "Banner",
          path: "/banner",
          name: "banner",
        },
        {
          icon: "./src/assets/img/icons/products.svg",
          text: "Bolsa de trabajo",
          path: "#3",
          name: "jobs",
          children: [
            {
              icon: "now-ui-icons files_paper",
              text: "Nested 1 ",
              path: "/products",
            },
            {
              icon: "now-ui-icons files_paper",
              text: "Nested 2",
              path: "/categories",
            },
            {
              icon: "now-ui-icons location_bookmark",
              text: "Nested 3",
              path: "/attribute-sets",
            },
          ],
        },
        {
          icon: "./src/assets/img/icons/clients.svg",
          text: "Sucursales",
          path: "#3",
          name: "branches",
        },
        {
          icon: "./src/assets/img/icons/marketing.svg",
          text: "Contacto",
          path: "#4",
          name: "contact",
        },
        {
          icon: "./src/assets/img/icons/reports.svg",
          text: "Pedidos anticipados",
          path: "#5",
          name: "early",
        },
        {
          icon: "./src/assets/img/icons/settings.svg",
          text: "Pedidos entre sucursales",
          path: "#6",
          name: "between",
        },
        {
          icon: "./src/assets/img/icons/integrations.svg",
          text: "Preguntas frecuentes",
          path: "#7",
          name: "faqs",
        },
      ],
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
