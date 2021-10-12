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
    path: "/entradas",
    redirect: "/entradas/buscar",
    name: "Entries",
    component: () => import("@/views/Entries/Entries.vue"),
    children: [
      {
        path: "buscar",
        name: "EntryLoaded",
        props: true,
        component: () => import("@/views/Entries/EntryLoaded.vue"),
      },
      {
        path: "registro/:countingId",
        name: "EntrySuccess",
        props: true,
        component: () => import("@/views/Entries/EntrySuccess.vue"),
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
