import { addOutPreload } from "@/api/preloads.api";

const outs = {
  state: {
    itemsCohorte: [],
    preloadOrigin: "",
    assignedTo: "",
    resStatus: null,
    loader: false,
    preloadId: "",
    messageResponse: "",
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
    GET_MESSAGE_RESPONSE: (state, payload) => {
      state.messageResponse = payload;
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
        } else {
          commit("GET_MESSAGE_RESPONSE", res.data.message);
        }
        console.log("out", res);
      } catch (error) {
        commit("FETCH_LOADER_STATUS", false);
        console.log(error.response);
        if (error.response) {
          commit("GET_MESSAGE_RESPONSE", error.response.data.message);
          commit("FETCH_PRELOAD_OUT_STATUS", error.response.status);
        }
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

    currentOutPreloadId(state) {
      return state.preloadId;
    },
    messageResponseText(state) {
      return state.messageResponse;
    },
  },
};

export default outs;
