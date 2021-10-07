import Vue from "vue";
import Vuex from "vuex";
import filters from "./modules/filters.store";
import entries from "./modules/entries.store";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    entries,
    filters,
  },
});
