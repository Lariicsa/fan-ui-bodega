import { MAIN_SERVICE } from "../services/index";

const GET_COUNTING = "/v1/warehouse/counts/";
const POST_PRELOAD = "/v1/warehouse/preloads";
const GET_COUNTING_DETAIL = "/v1/warehouse/counts/";
const GET_PRELOAD = "/v1/warehouse/preloads/";
const GET_PRELOAD_DETAIL = "/v1/warehouse/preloads/";
const GET_PRELOADS_ALL = "/v1/warehouse/preloads";
const UPDATE_PRELOAD_LOCATION = "/v1/warehouse/preload_details";
const UPDATE_PRELOAD_STATUS = "/v1/warehouse/preloads";
const GET_PRODUCTS_SEARCH = "/v1/warehouse/products";
const PUT_UPDATE_ENTRY_LOCATION ="/v1/warehouse/inventory"


const getCountingOrder = (idCount) => MAIN_SERVICE.get(GET_COUNTING + idCount);
const addPreload = ({ countId, type, fromTo, assignedTo }) =>
  MAIN_SERVICE.post(POST_PRELOAD, { countId, type, fromTo, assignedTo });
const getOrderDetail = (idCounting) =>
  MAIN_SERVICE.get(
    GET_COUNTING_DETAIL + idCounting + "/detail?limit=50&page=1"
  );
const getPreload = (preloadId) => MAIN_SERVICE.get(GET_PRELOAD + preloadId);
const preloadDetail = (idPreload) =>
  MAIN_SERVICE.get(GET_PRELOAD_DETAIL + idPreload + "/detail?limit=90&page=1");
const allPreloads = () =>
  MAIN_SERVICE.get(GET_PRELOADS_ALL + "?limit=50&page=1");
const updatePreloadLocation = ({ action, id, finalLocation }) =>
  MAIN_SERVICE.put(UPDATE_PRELOAD_LOCATION, {
    action,
    detail: { id, finalLocation },
  });
const updatePreloadStatus = ({ action, id, newStatus }) =>
  MAIN_SERVICE.put(UPDATE_PRELOAD_STATUS, {
    action,
    preload: { id, newStatus },
  });
const updateEntryLocation = ({action, id, location}) => MAIN_SERVICE.put(PUT_UPDATE_ENTRY_LOCATION, { action,
  preload: { id, location}})
const findEntryByParam = (param) =>
  MAIN_SERVICE.get(GET_PRODUCTS_SEARCH + param);
const latestsEntries = () => MAIN_SERVICE.get(GET_PRODUCTS_SEARCH)

export {
  getCountingOrder,
  addPreload,
  getOrderDetail,
  getPreload,
  preloadDetail,
  allPreloads,
  updatePreloadLocation,
  updatePreloadStatus,
  findEntryByParam,
  updateEntryLocation,
  latestsEntries
};
