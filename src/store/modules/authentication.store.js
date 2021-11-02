import { loginSuperAdmin, postRegisterUser } from "@/api/auth.api";

const auth = {
  state: {
    tkn: localStorage.getItem("tsa"),
    session: localStorage.getItem("session"),
    user: {
      email: "",
      name: "",
      lastname: "",
    },

    responseMessage: "",
    responseStatus: null,
    loader: false,
  },

  mutations: {
    FETCH_LOADER_STATUS: (state, payload) => {
      state.loader = payload;
    },
    GET_RESPONSE_MESSAGE: (state, payload) => {
      state.responseMessage = payload;
    },
    FETCH_RESPONSE_STATUS: (state, payload) => {
      state.responseStatus = payload;
    },

    SET_TEMP_LS_DATA: (state, payload) => {
      state.tkn = payload.token;
      state.session = payload.session;
    },
  },

  actions: {
    async loginSuper({ commit }, data) {
      commit("FETCH_LOADER_STATUS", true);
      try {
        const res = await loginSuperAdmin(data);
        let token = res.data.payload.token;
        let status = res.status;
        if (status == 200) {
          localStorage.setItem("tsa", token);
          localStorage.setItem("session", true);
          commit("FETCH_LOADER_STATUS", false);
          commit("SET_TEMP_LS_DATA", { token, session: true });
        }
        console.log("res", res.data);
      } catch (error) {
        console.log(error.response);
        commit("FETCH_LOADER_STATUS", false);
      }
    },

    async addNewUser({ commit }, data) {
      commit("FETCH_LOADER_STATUS", true);
      try {
        const res = await postRegisterUser(data);
        console.log(res);
        let status = res.status;
        let message = res.data.message;
        if (status == 200) {
          commit("FETCH_LOADER_STATUS", false);
          commit("GET_RESPONSE_MESSAGE", message);
          commit("FETCH_RESPONSE_STATUS", status);
        }
      } catch (error) {
        commit("FETCH_LOADER_STATUS", false);
        console.log(error.response);
        if (error.response) {
          let message = error.response.data.message;
          let status = error.response.status;
          commit("GET_RESPONSE_MESSAGE", message);
          commit("FETCH_RESPONSE_STATUS", status);
        }
      }
    },

    //temporal
    logOut({ commit }, data) {
      localStorage.removeItem("tsa");
      localStorage.removeItem("session");
      commit("SET_TEMP_LS_DATA", { token: null, session: false });
    },
  },

  getters: {
    isLoged: (state) => !!state.session,
    autResponseStatus: (state) => {
      return state.responseStatus;
    },
    autResponseMessage: (state) => {
      return state.responseMessage;
    },
  },
};

export default auth;
