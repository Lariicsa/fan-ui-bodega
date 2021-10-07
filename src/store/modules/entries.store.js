import { getCountingOrder } from "@/api/entries.api";

const entries = {
  state: {
    countId: "",

    countingData: null,
    countingDataDetail: null,
    entriesResults: [],
    entriesOrigin: "",
    assignedEmployee: '',
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
    SET_ENTRIES_ORIGIN: (state, payload) => {
      state.entriesOrigin = payload;
    },
    SET_ASSIGNED_EMPLOYEE: (state, payload)=> {
      state.assignedEmployee
    }
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

    setEntrieOrigin({ commit }, origin) {
      commit("SET_ENTRIES_ORIGIN", origin);
      console.log('origin', origin );
    },

    setAssignedTo({commit}, name) {
      commit("SET_ASSIGNED_EMPLOYEE", name)
      console.log('name', name);
    }
  },
};

export default entries;
