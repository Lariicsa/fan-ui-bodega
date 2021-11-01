import { MAIN_SERVICE } from "../services/index";

const POST_LOGIN = "/v1/auth/login";
const POST_REGISTER = "v1/users";

const loginSuperAdmin = ({ email, password }) =>
  MAIN_SERVICE.post(POST_LOGIN, {
    email,
    password,
  });
const postRegisterUser = ({
  email,
  password,
  confirmPassword,
  name,
  lastName,
  roles,
}) =>
  MAIN_SERVICE.post(POST_REGISTER, {
    email,
    password,
    confirmPassword,
    name,
    lastName,
    roles,
  });

export { loginSuperAdmin, postRegisterUser };
