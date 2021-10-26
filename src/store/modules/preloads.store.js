import {
  addPreload,
  allPreloads,
  getCountingOrder,
  getOrderDetail,
  getPreload,
  preloadDetail,
  updatePreloadLocation,
  updatePreloadStatus,
} from "@/api/entries.api";

const entries = {
  state: {
    countingData: null,
    countingDataDetail: null,
    countingDetail: null,
    preloadEntryId: "",
    preloadResults: [],
    preloadsAll: [],
    preloadDetail: [],
    assignedEmployee: "",
    loader: false,
    status: false,
    statusResponse: undefined,
    statusError: undefined,
    errorMessage: "",
    totalResults: undefined,
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
    SET_PRELOAD_ORIGIN: (state, payload) => {
      state.entriesOrigin = payload;
    },
    SET_ASSIGNED_EMPLOYEE: (state, payload) => {
      state.assignedEmployee = payload;
    },
    FETCH_STATUS: (state, payload) => {
      state.status = payload;
    },
    FETCH_RESPONSE_STATUS: (state, payload) => {
      state.statusResponse = payload;
    },
    FETCH_RESPONSE_ERROR_STATUS: (state, payload) => {
      state.statusError = payload;
    },

    GET_PRELOAD_BY_ID: (state, payload) => {
      state.preloadResults = payload;
    },

    GET_PRELOAD_DETAILS: (state, payload) => {
      state.preloadDetail = payload;
    },
    GET_PRELOAD_RESPONSE: (state, payload) => {
      state.preloadEntryId = payload;
    },
    FETCH_ALL_PRELOADS: (state, payload) => {
      state.preloadsAll = payload;
    },
    GET_ERROR_MESSAGE: (state, payload) => {
      state.errorMessage = payload;
    },

    FETCH_TOTAL_RESULT: (state, payload) => {
      state.totalResults = payload;
    },

    GET_ENTRIES_RESULT: (state, payload) => {
      state.entriesResults = payload;
    },
  },

  actions: {
    async getAllPreloads({ commit }) {
      commit("FETCH_LOADER_STATUS", true);
      try {
        const res = await allPreloads();
        const items = res.data.payload;
        commit("FETCH_LOADER_STATUS", false);
        commit("FETCH_ALL_PRELOADS", items);
        console.log("all", res);
      } catch (error) {
        commit("FETCH_LOADER_STATUS", false);
        console.log(error);
      }
    },

    async getItemsCountData({ commit }, idC) {
      commit("FETCH_LOADER_STATUS", true);
      try {
        const res = await getCountingOrder(idC);
        const payload = res.data.payload;
        let success = res.status;
        if (success == 200) {
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
          commit("FETCH_RESPONSE_STATUS", success);
          commit("FETCH_RESPONSE_ERROR_STATUS", success);

          if (payload.length > 1) {
            commit("FETCH_RESPONSE_STATUS", 400);
            commit("FETCH_RESPONSE_ERROR_STATUS", 400);
            commit("FETCH_LOADER_STATUS", false);
          }
        }
        commit("FETCH_LOADER_STATUS", false);
      } catch (error) {
        commit("FETCH_LOADER_STATUS", false);
        if (error.response) {
          let status = error.response.status;
          console.log("status", status);
          commit("FETCH_RESPONSE_ERROR_STATUS", status);
          commit("FETCH_RESPONSE_STATUS", status);
        }
      }
    },

    async getCountingDetail({ commit }, idC) {
      try {
        const res = await getOrderDetail(idC);
        let items = res.data.payload;
        if (items.length) {
          commit("GET_COUNTING_DETAILS", items);
        }
      } catch (error) {
        if (error.response) {
          let status = error.response.status;
          console.log("err", error.response);
          commit("FETCH_RESPONSE_ERROR_STATUS", status);
        }
      }
    },

    async loadPreloadFromCounting({ commit }, data) {
      commit("FETCH_LOADER_STATUS", true);
      console.log("data", data);
      try {
        const res = await addPreload(data);
        let success = res.status;
        let preloadId = res.data.payload.preloadId;
        console.log("preloadId:", preloadId);
        if (success == 200) {
          commit("FETCH_LOADER_STATUS", false);
          commit("FETCH_STATUS", true);
          commit("GET_PRELOAD_RESPONSE", preloadId);
        }
        console.log(res);
      } catch (error) {
        commit("FETCH_LOADER_STATUS", false);
        console.log("counting", error.response.status);
        if (error.response) {
          let status = error.response.status;
          commit("FETCH_RESPONSE_ERROR_STATUS", status);
        }
      }
    },

    async getPreloaded({ commit }, preloadId) {
      commit("FETCH_LOADER_STATUS", true);
      try {
        const res = await getPreload(preloadId);
        let preloadRes = res.data.payload;
        let success = res.status;
        if (success == 200) {
          commit("FETCH_LOADER_STATUS", false);
          commit("GET_PRELOAD_BY_ID", preloadRes);
          commit("FETCH_RESPONSE_STATUS", success);
        }
        console.log("getPreloaded", preloadRes);
      } catch (error) {
        commit("FETCH_LOADER_STATUS", false);
        console.log(error);
      }
    },

    async getPreloadDetail({ commit }, data) {
      try {
        commit("FETCH_LOADER_STATUS", true);
        let page = data.page;
        let preloadId = data.preloadId;
        const res = await preloadDetail(
          `${preloadId}/detail?limit=9&page=${page}`
        );
        let success = res.status;
        const items = res.data.payload;
        if (success == 200) {
          let total = items.total_items;
          commit("FETCH_LOADER_STATUS", false);
          commit("GET_PRELOAD_DETAILS", items);
          commit("FETCH_RESPONSE_STATUS", success);
          commit("FETCH_TOTAL_RESULT", total);

          console.log('preloadDetail', res.data);
        }
      } catch (error) {
        commit("FETCH_LOADER_STATUS", false);
        if (error.response) {
          let status = error.response.status;
          commit("FETCH_RESPONSE_ERROR_STATUS", status);
        }
      }
    },

    async setPreloadLocation({ commit }, data) {
      try {
        const entryLocation = {
          action: "UPDATE_LOCATION",
          id: data.detail_id,
          finalLocation: data.final_location,
        };
        const res = await updatePreloadLocation(entryLocation);
        console.log("res", res);
      } catch (error) {
        console.log(error.response);
      }
    },

    async updatePreloadsStatus({ commit }, data) {
      commit("FETCH_LOADER_STATUS", true);
      try {
        const newStatus = {
          action: "UPDATE_STATUS",
          id: data.id,
          newStatus: data.newStatus,
        };
        const res = await updatePreloadStatus(newStatus);
        let status = res.status;
        if (status == 200) {
          commit("FETCH_LOADER_STATUS", false);
        }
        console.log("resstatus", res);
      } catch (error) {
        commit("FETCH_LOADER_STATUS", false);
        console.log(error.response);
        if (error.response) {
          let statuserr = error.response.status;
          let message = error.response.data.message;
          console.log("message", message);
          commit("FETCH_RESPONSE_ERROR_STATUS", statuserr);
          commit("GET_ERROR_MESSAGE", message);
        }
      }
    },

    setPreloadOrigin({ commit }, origin) {
      commit("SET_PRELOAD_ORIGIN", origin);
    },

    setAssignedTo({ commit }, name) {
      commit("SET_ASSIGNED_EMPLOYEE", name);
    },
  },

  getters: {
    currentPreloads(state) {
      const items = state.preloadsAll;
      let formated = items.map((item, n) => {
        return {
          index: n + 1,
          preload_id: item.preload_id,
          total_items: item.total_items,
          from_to: item.from_to,
          action_type: item.action_type,
          assigned_to: item.assigned_to,
          created_at: item.created_at,
          created_by: item.created_by,
          status: item.status,
        };
      });
      return formated;
    },

    countingMainDetails(state) {
      const items = state.countingDataDetail;
      if (items != undefined) {
        const sorted = items.sort(function(a, b) {
          if (a.id < b.id) {
            return -1;
          }
          if (a.id > b.id) {
            return 1;
          }

          return 0;
        });
        return sorted;
      }
    },

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

        const sorted = detail.sort(function(a, b) {
          if (a.brand < b.brand) {
            return -1;
          }
          if (a.brand > b.brand) {
            return 1;
          }
          return 0;
        });

        return sorted;
      }
    },

    preloadDataResult(state) {
      let item = state.preloadResults;
      const formated = {
        total_items: item.total_items,
        action_type: item.action_type,
        from_to: item.from_to,
        created_at: item.created_at,
        created_by: item.created_by,
        assigned_to: item.assigned_to,
        status: item.status,
      };

      return formated;
    },
    preloadDataDetails(state) {
      let items = state.preloadDetail.items;
      if (items != undefined) {
        let formated = items.map((ele) => {
          let elems = {
            detail_id: ele.detail_id,
            product_id: ele.product_id,
            description: ele.description,
            brand: ele.brand,
            line: ele.line,
            control: ele.control,
            //pre_location: ele.pre_location,
            updated_by: ele.updated_by,
            updated_at: ele.updated_at,
            final_location: ele.final_location,
            status: ele.status,
          };
          return elems;
        });

        const sorted = formated.sort(function(a, b) {
          if (a.detail_id < b.detail_id) {
            return -1;
          }
          if (a.detail_id > b.detail_id) {
            return 1;
          }
          return 0;
        });
        return sorted;
      }
    },

    currentStatus(state) {
      return state.status;
    },
    currentPreloadId(state) {
      return state.preloadEntryId;
    },

    currentPreloadsStatus(state) {
      return state.preloadResults.status;
    },

    currentStatusResponse(state) {
      return state.statusResponse;
    },

    totalItems(state) {
      let results = state.totalResults;
      if (results != undefined) {
        return results;
      } else {
        return 1;
      }
    },

    preloadActionType(state, getters) {
      let details = getters.preloadDataResult;
      if (details != undefined) {
        return details.action_type;
      }
    },
  },
};

export default entries;
