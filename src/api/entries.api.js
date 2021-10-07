import { MAIN_SERVICE } from "../services/index";

const GET_COUNTING = "/v1/warehouse/counts/";
const POST_PRELOAD = "/v1/warehouse/preload";

const getCountingOrder = (idCount) => MAIN_SERVICE.get(GET_COUNTING + idCount);
const addPreload = ({ countId, type, fromTo, assignedTo }) =>
  MAIN_SERVICE.post(POST_PRELOAD, { countId, type, fromTo, assignedTo });

export { getCountingOrder, addPreload };
