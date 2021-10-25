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

  getters:{
    itemsOutCohorte(state) {
      let items = state.itemsCohorte.map((ele,i) => {
        return {index: i+1, ...ele}
      })
      return items
    }
  }
};

export default outs;
