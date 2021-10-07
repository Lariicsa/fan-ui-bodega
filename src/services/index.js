import axios from "axios";

const mainHeaders = {
  "content-Type": "application/json",
  accept: "application/json",
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
    config.headers["x-jwt-token"] = localStorage.getItem("jwt");
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

export { MAIN_SERVICE };
