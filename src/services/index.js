import axios from "axios";

const AUTH_TOKEN = `Bearer ${localStorage.getItem("tsa")}`

const mainHeaders = {
  "content-Type": "application/json",
  accept: "application/json",
  Authorization: AUTH_TOKEN ,
};

const mainBaseURL = () => {
  return "http://localhost:3006/api";
};

const MAIN_SERVICE = axios.create({
  baseURL: mainBaseURL(),
  headers: mainHeaders,
});

MAIN_SERVICE.interceptors.request.use(
  function(config) {
    config.headers["Authorization"] = AUTH_TOKEN;
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

export { MAIN_SERVICE };
