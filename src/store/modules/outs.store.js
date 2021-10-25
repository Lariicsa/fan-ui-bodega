import { addOutPreload } from "@/api/preloads.api";

const outs = {
  state: {
    itemsCohorte: [],
    preloadOrigin: "",
    assignedTo: "",
  },

  mutations: {
    ADD_OUT_ITEM: (state, payload) => {
      console.log(payload);
      state.itemsCohorte.push(payload);
    },

    SET_PRELOAD_ORIGIN: (state, payload) => {
      state.preloadOrigin = payload;
    },

    SET_PRELOAD_ASSIGNEDTO: (state, payload) => {
      state.assignedTo = payload;
    },
  },

  actions: {
    async registerNewOut({ commit }, data) {
      try {
        const res = await addOutPreload(data);

        console.log("out", res);
      } catch (error) {
        console.log(error.response);
      }
    },
  },

  getters: {
    itemsOutCohorte(state) {
      let items = state.itemsCohorte.map((ele, i) => {
        return { index: i + 1, ...ele };
      });
      return items;
    },
  },
};

export default outs;
