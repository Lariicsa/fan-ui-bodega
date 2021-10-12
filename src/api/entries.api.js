import { MAIN_SERVICE } from "../services/index";

const GET_COUNTING = "/v1/warehouse/counts/";
const POST_PRELOAD = "/v1/warehouse/preloads";
const GET_COUNTING_DETAIL = "/v1/warehouse/counts/";
const GET_PRELOAD = "/v1/warehouse/preloads/";
const GET_PRELOAD_DETAIL = "/v1/warehouse/preloads/";

const getCountingOrder = (idCount) => MAIN_SERVICE.get(GET_COUNTING + idCount);
const addPreload = ({ countId, type, fromTo, assignedTo }) =>
  MAIN_SERVICE.post(POST_PRELOAD, { countId, type, fromTo, assignedTo });
const getOrderDetail = (idCounting) =>
  MAIN_SERVICE.get(
    GET_COUNTING_DETAIL + idCounting + "/detail?limit=10&page=1"
  );
const getPreload = (preloadId) => MAIN_SERVICE.get(GET_PRELOAD + preloadId);
const preloadDetail = (idPreload) =>
  MAIN_SERVICE.get(GET_PRELOAD_DETAIL + idPreload + "/detail?limit=90&page=1");

export { getCountingOrder, addPreload, getOrderDetail, getPreload, preloadDetail };
