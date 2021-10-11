import {
  addPreload,
  getCountingOrder,
  getOrderDetail,
  getPreload,
  preloadDetail,
} from "@/api/entries.api";

const entries = {
  state: {
    countingData: null,
    countingDataDetail: null,
    countingDetail: null,
    entriesResults: [],
    entriesDetail: [],
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

    GET_ENTRIE_BY_ID: (state, payload) => {
      state.entriesResults = payload;
    },

    GET_ENTRIE_DETAILS: (state, payload) => {
      state.entriesDetail = payload;
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
      commit("FETCH_LOADER_STATUS", true);
      try {
        const res = await getPreload(preloadId);
        let entrieRes = res.data.payload;
        let succes = res.status;
        if (succes == 200) {
          commit("FETCH_LOADER_STATUS", false);
          commit("GET_ENTRIE_BY_ID", entrieRes);
        }

        console.log("getPreloaded", entrieRes);
      } catch (error) {
        commit("FETCH_LOADER_STATUS", false);
        console.log(error);
      }
    },

    async getPreloadDetail({ commit }, preloadId) {
      try {
        commit("FETCH_LOADER_STATUS", true);
        const res = await preloadDetail(preloadId);
        let success = res.status;
        const items = res.data.payload;
        if (success == 200) {
          commit("FETCH_LOADER_STATUS", false);
          commit("GET_ENTRIE_DETAILS", items);
        }
        console.log("PreloadDetail", items);
      } catch (error) {
        commit("FETCH_LOADER_STATUS", false);
        console.log(error);
      }
    },

    setEntrieOrigin({ commit }, origin) {
      commit("SET_ENTRIES_ORIGIN", origin);
    },

    setAssignedTo({ commit }, name) {
      commit("SET_ASSIGNED_EMPLOYEE", name);
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

    entryDataResult(state) {
      let item = state.entriesResults;
      const formated = {
        total_items: item.total_items,
        action_type: item.action_type,
        from_to: item.from_to,
        created_by: item.created_by,
        created_at: item.created_at,
        assigned_to: item.assigned_to,
        num_order: item.num_order,
        status: item.status,
      };

      return formated;
    },
    entryDataDetails(state) {
      let items = state.entriesDetail.items;
      if (items != undefined) {
        let formated = items.map((ele) => {
          let elems = {
            detail_id: ele.detail_id,
            quantity: ele.quantity,
            product_id: ele.product_id,
            description: ele.description,
            brand: ele.brand,
            line: ele.line,
            control: ele.control,
            pre_location: ele.pre_location,
            final_location: ele.final_location,
            updated_by: ele.updated_by,
            updated_at: ele.updated_at,
            status: ele.status,
          };
          return elems;
        });
        return formated;
      }
    },
    currentStatus(state) {
      return state.status
    }
  },
};

export default entries;
