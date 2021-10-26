import { addOutPreload } from "@/api/preloads.api";

const outs = {
  state: {
    itemsCohorte: [],
    preloadOrigin: "",
    assignedTo: "",
    resStatus: null,
    loader: false,
    preloadId: "",
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
    FETCH_LOADER_STATUS: (state, payload) => {
      state.loader = payload;
    },
    FETCH_PRELOAD_OUT_STATUS: (state, payload) => {
      state.resStatus = payload;
    },
    GET_PRELOAD_OUT_ID: (state, payload) => {
      state.preloadId = payload;
    },
  },

  actions: {
    async registerNewOut({ commit }, data) {
      commit("FETCH_LOADER_STATUS", true);
      try {
        const res = await addOutPreload(data);
        let status = res.status;
        let preloadId = res.data.payload.preloadId;
        if (status == 200) {
          commit("FETCH_LOADER_STATUS", false);
          commit("FETCH_PRELOAD_OUT_STATUS", true);
          commit("GET_PRELOAD_OUT_ID", preloadId);
        }
        console.log("out", res);
      } catch (error) {
        commit("FETCH_LOADER_STATUS", false);
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

    currentPreloadOutstatus(state) {
      return state.resStatus;
    },

    currentOutPreloadId(state){
      return state.preloadId
    }
  },
};

export default outs;
