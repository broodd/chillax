const state = {
  nowPlayingId: undefined
};

const mutations = {
  setNowPlayingId (state, nowPlayingId) {
    state.nowPlayingId = nowPlayingId;
  }
};

const actions = {
  setNowPlayingId ({ commit }, payload) {
    commit('setNowPlayingId', payload);
  }
};

const getters = {
  getNowPlayingId (state) {
    return state.nowPlayingId;
  }
}

export default {
  state,
  mutations,
  actions,
  getters
};
