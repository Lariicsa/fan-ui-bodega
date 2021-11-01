import { MAIN_SERVICE } from "../services/index";

const POST_LOGIN = "/v1/auth/login";

const loginSuperAdmin = ({ email, password }) =>
  MAIN_SERVICE.post(POST_LOGIN, {
    email,
    password,
  });

export { loginSuperAdmin };
