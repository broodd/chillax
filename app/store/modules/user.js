const appSettings = require("tns-core-modules/application-settings");

const state = {
  token: undefined,
  user: undefined
};

const mutations = {
  setToken (state, token) {
    state.token = token;
    appSettings.setString('token', token);
  },
  setUser (state, { token, userId }) {
    state.token = token;
    state.userId = userId;
    appSettings.setString('token', token);
    appSettings.setString('userId', userId);
  }
};

const actions = {
  setToken ({ commit }, payload) {
    commit('setToken', payload);
  },
  setUser ({ commit }, payload) {
    commit('setUser', payload);
  }
};

const getters = {
  getToken (state) {
    return state.token || appSettings.getString('token');
  },
  getUserId (state) {
    return state.userId || appSettings.getString('userId');
  },
}

export default {
  state,
  mutations,
  actions,
  getters
};
