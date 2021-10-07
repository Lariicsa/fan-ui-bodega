import { getCountingOrder } from "@/api/entries.api";

const entries = {
  state: {
    countId: "",
    entriesResults: [],
    countingData: null,
    countingDataDetail: null,
    loader: false,
  },

  mutations: {
    SET_COUNTING_ID: (state, payload) => {
      state.countId = payload;
    },
    GET_COUNTING_DATA: (state, payload) => {
      state.countingData = payload;
    },

    GET_COUNTING_DETAIL_DATA: (state, payload) => {
      state.countingDataDetail = payload;
    },
    FETCH_LOADER_STATUS: (state, payload) => {
      state.loader = payload;
    },
  },

  actions: {
    async getEntriesCountData({ commit }, idC) {
      commit("FETCH_LOADER_STATUS", true);
      try {
        const res = await getCountingOrder(idC);
        const payload = res.data.payload;
        let success = res.status;
        if (success) {
          commit("FETCH_LOADER_STATUS", false);
          let mainData = {
            count_id: payload.count_id,
            created_by: payload.created_by,
            date: payload.date,
            description: payload.description,
            total_items: payload.total_items,
          };
          let dataDetail = payload.brands;
          commit("GET_COUNTING_DATA", mainData);
          commit("GET_COUNTING_DETAIL_DATA", dataDetail);
        }
        console.log(res);
      } catch (error) {
        console.log(error.response);
      }
    },
  },
};

export default entries;
