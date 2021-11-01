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

    loader: false,
  },

  mutations: {
    FETCH_LOADER_STATUS: (state, payload) => {
      state.loader = payload;
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
        }
        console.log("res", res.data);
      } catch (error) {
        console.log(error.response);
        commit("FETCH_LOADER_STATUS", false);
      }
    },
  },

  getters: {
    isLoged: (state) => !!state.session,
  }
};

export default auth;
