import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store/index.js";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    meta: { requireAuth: true },
    component: () => import("@/views/Home.vue"),
  },
  //route for testing
  {
    path: "/devtest",
    name: "Testing",
    component: () => import("@/views/Testing.vue"),
  },
  {
    path: "/ingresar",
    name: "Login",
    component: () => import("@/views/Authentication/Login.vue"),
  },
  {
    path: "/registrar",
    name: "Register",
    meta: { requireAuth: true },
    component: () => import("@/views/Authentication/RegisterUser.vue"),
  },
  {
    path: "/precargas",
    redirect: "/precargas/buscar/:preloadId?",
    name: "Preloads",
    meta: { requireAuth: true },
    component: () => import("@/views/Preloads/Preloads.vue"),
    children: [
      {
        path: "buscar/:preloadId?",
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
      {
        path: "registro/:preloadId",
        name: "PreloadSuccess",
        props: true,
        component: () => import("@/views/Preloads/PreloadSuccess.vue"),
      },
    ],
  },
  {
    path: "/entradas",
    redirect: "/entradas/buscar",
    name: "Entries",
    meta: { requireAuth: true },
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
    ],
  },
  {
    path: "/salidas",
    redirect: "/salidas/registro",
    name: "Outs",
    meta: { requireAuth: true },
    component: () => import("@/views/Outs/Outs.vue"),
    children: [
      {
        path: "registro",
        name: "OutsAddNew",
        props: true,
        component: () => import("@/views/Outs/OutsAddNew.vue"),
      },
      {
        path: "salida/:preloadId",
        name: "OutsSuccess",
        props: true,
        component: () => import("@/views/Outs/OutsSuccess.vue"),
      },
    ],
  },
  {
    path: "/404",
    alias: "*",
    name: "NoRoute",
    component: () => import("@/views/NoRoute.vue"),
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

router.beforeEach((to, from, next) => {
  const protectedRoute = to.matched.some((record) => record.meta.requireAuth);
  if (protectedRoute && store.state.auth.session === null) {
    next({ name: "Login" });
  } else {
    next();
  }

});

export default router;
