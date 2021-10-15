import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/precargas",
    redirect: "/precargas/buscar",
    name: "Preloads",
    component: () => import("@/views/Preloads/Preloads.vue"),
    children: [
      {
        path: "buscar",
        name: "PreloadsFind",
        props: true,
        component: () => import("@/views/Preloads/PreloadsFind.vue"),
      },

      {
        path: "disponibles",
        name: "PreloadsAll",
        props: true,
        component: () => import("@/views/Preloads/PreloadsAll.vue"),
      },
    ],
  },
  {
    path: "/entradas",
    redirect: "/entradas/buscar",
    name: "Entries",
    component: () => import("@/views/Entries/Entries.vue"),
    children: [
      {
        path: "buscar",
        name: "EntryFind",
        props: true,
        component: () => import("@/views/Entries/EntryFind.vue"),
      },
      {
        path: "registro/:countingId",
        name: "EntrySuccess",
        props: true,
        component: () => import("@/views/Entries/EntrySuccess.vue"),
      },
      {
        path: "disponibles",
        name: "EntriesAll",
        props: true,
        component: () => import("@/views/Entries/EntriesAll.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
  base: process.env.BASE_URL,
  routes,
});

export default router;
