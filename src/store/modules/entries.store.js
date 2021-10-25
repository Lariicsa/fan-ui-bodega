import {
  findEntryByParam,
  updateEntryLocation,
  latestsEntries,
} from "@/api/entries.api";

const entries = {
  state: {
    entriesResults: [],
    entriesDetail: [],
    entriesOrigin: "",
    loader: false,
    status: false,
    statusResponse: undefined,
    statusError: undefined,
    errorMessage: "",
    totalResults: undefined,
  },

  mutations: {
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
    async updateEntryLocation({ commit, dispatch }, data) {
      commit("FETCH_LOADER_STATUS", true);
      try {
        const updating = {
          action: data.action,
          inventory: data.inventory,
          productId: data.productId,
          location: data.location,
          newLocation: data.newLocation,
          quantity: data.quantity,
        };
        const res = await updateEntryLocation(updating);
        let success = res.data.status;
        if (success == 200) {
          dispatch("getLatestEntries");
        }
        console.log("entrulocation", res);
        commit("FETCH_LOADER_STATUS", false);
      } catch (error) {
        commit("FETCH_LOADER_STATUS", false);
        console.log(error.response);
        if (error.response) {
          let status = error.response.status;
          commit("FETCH_RESPONSE_ERROR_STATUS", status);
        }
      }
    },

    async findEntryByParam({ commit }, param) {
      console.log("param", param);
      commit("FETCH_LOADER_STATUS", true);
      try {
        const res = await findEntryByParam(param);
        let result = res.data.payload;
        commit("FETCH_LOADER_STATUS", false);
        commit("GET_ENTRIES_RESULT", result);
        console.log("found", res);
      } catch (error) {
        commit("FETCH_LOADER_STATUS", false);
        console.log(error.response);
      }
    },

    async getLatestEntries({ commit }) {
      commit("FETCH_LOADER_STATUS", true);
      try {
        const res = await latestsEntries();
        let result = res.data.payload;
        commit("FETCH_LOADER_STATUS", false);
        commit("GET_ENTRIES_RESULT", result);
        console.log("entries", res);
      } catch (error) {
        commit("FETCH_LOADER_STATUS", false);
        console.log(error.response);
      }
    },
  },

  getters: {
    entryDataResult(state) {
      let item = state.entriesResults;

      let sorted = item.map((ele) => {
        const formated = {
          product_id: ele.product_id,
          description: ele.description,
          brand: ele.brand,
          line: ele.line,
          control: ele.control,
          //pre_location: ele.pre_location,
          updated_at: ele.updated_at,
          updated_by: ele.updated_by,
          total_items: ele.total_items,
          final_location: ele.final_location,
        };
        return formated;
      });

      return sorted;
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
            status: ele.status,
            //pre_location: ele.pre_location,
            updated_by: ele.updated_by,
            updated_at: ele.updated_at,
            final_location: ele.final_location,
          };
          return elems;
        });
        return formated;
      }
    },
  },
};

export default entries;
