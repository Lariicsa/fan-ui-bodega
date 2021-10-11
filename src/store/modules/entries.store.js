import {
  addPreload,
  getCountingOrder,
  getOrderDetail,
  getPreload,
} from "@/api/entries.api";

const entries = {
  state: {
    countingData: null,
    countingDataDetail: null,
    countingDetail: null,
    entriesResults: [],
    entriesOrigin: "",
    assignedEmployee: "",
    loader: false,
    status: false,
  },

  mutations: {
    GET_COUNTING_DATA: (state, payload) => {
      state.countingData = payload;
    },

    GET_COUNTING_DATA_DETAIL: (state, payload) => {
      state.countingDataDetail = payload;
    },

    GET_COUNTING_DETAILS: (state, payload) => {
      state.countingDetail = payload;
    },
    FETCH_LOADER_STATUS: (state, payload) => {
      state.loader = payload;
    },
    SET_ENTRIES_ORIGIN: (state, payload) => {
      state.entriesOrigin = payload;
    },
    SET_ASSIGNED_EMPLOYEE: (state, payload) => {
      state.assignedEmployee = payload;
    },
    FETCH_STATUS: (state, payload) => {
      state.status = payload;
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
          commit("GET_COUNTING_DATA_DETAIL", dataDetail);
        }
        console.log(res);
      } catch (error) {
        commit("FETCH_LOADER_STATUS", false);
        console.log(error.response);
      }
    },

    async getEntriesCountDetail({ commit }, idC) {
      const res = await getOrderDetail(idC);
      let items = res.data.payload;
      commit("GET_COUNTING_DETAILS", items);
      console.log("details", res);
    },

    async loadEntrieFromCounting({ commit }, data) {
      commit("FETCH_LOADER_STATUS", true);
      console.log("data", data);
      try {
        const res = await addPreload(data);
        let success = res.status;
        if (success == 200) {
          commit("FETCH_LOADER_STATUS", false);
          commit("FETCH_STATUS", true);
        }
        console.log(res);
      } catch (error) {
        commit("FETCH_LOADER_STATUS", false);
        console.log(error.response);
      }
    },

    async getPreloaded({ commit }, preloadId) {
      try {
        const res = await getPreload(preloadId);
        console.log("getPreloaded", res);
      } catch (error) {
        commit("FETCH_LOADER_STATUS", false);
        console.log(error.response);
      }
    },

    setEntrieOrigin({ commit }, origin) {
      commit("SET_ENTRIES_ORIGIN", origin);
      console.log("origin", origin);
    },

    setAssignedTo({ commit }, name) {
      commit("SET_ASSIGNED_EMPLOYEE", name);
      console.log("name", name);
    },
  },

  getters: {
    countingDetails(state) {
      const items = state.countingDetail;
      if (items !== null) {
        let detail = items.map((ele) => {
          return {
            total_items: ele.total_items,
            product_id: ele.product_id,
            description: ele.description,
            brand: ele.brand,
            line_id: ele.line_id,
            control: ele.control,
            price: ele.price,
          };
        });
        return detail;
      }
    },
  },
};

export default entries;
