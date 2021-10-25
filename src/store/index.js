import Vue from "vue";
import Vuex from "vuex";
import entries from "./modules/entries.store";
import preloads from "./modules/preloads.store";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    entries,
    preloads,
  },
});
