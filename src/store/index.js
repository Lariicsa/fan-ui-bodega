import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/authentication.store";
import entries from "./modules/entries.store";
import preloads from "./modules/preloads.store";
import outs from "./modules/outs.store";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    entries,
    preloads,
    outs,
  },
});
