import { MAIN_SERVICE } from "../services/index";

const POST_PRELOAD = "/v1/warehouse/preloads";

const addOutPreload = ({ type, assignedTo, fromTo, numOrder, items }) =>
  MAIN_SERVICE.post(POST_PRELOAD, {
    type,
    assignedTo,
    fromTo,
    numOrder,
    items,
  });

export { addOutPreload };
