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

  mutations: {},

  actions: {
    async loginSuper({ commit }, data) {
      try {
        const res = await loginSuperAdmin(data);
        let token = res.data.payload.token;
        let status = res.status;
        if (status == 200) {
          //commit("SET_SUPER_TOKEN", token)
          localStorage.setItem("tsa", token);
          localStorage.setItem("session", true);
        }
        console.log("res", res.data);
      } catch (error) {
        console.log(error.response);
      }
    },
  },
};

export default auth;
