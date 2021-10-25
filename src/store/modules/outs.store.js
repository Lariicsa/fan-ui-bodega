const outs = {
  state: {
    itemsCohorte: [],
  },

  mutations: {
    ADD_OUT_ITEM: (state, payload) => {
      console.log(payload);
      state.itemsCohorte.push(payload);
    },
  },
};

export default outs;
