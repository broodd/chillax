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
	setUser (state, { token, user }) {
		state.token = token;
		state.user = user;
	}
};

const actions = {
	setToken: ({ commit }, payload) => {
		commit('setToken', payload);
	},
	setUser: ({ commit }, payload) => {
		commit('setUser', payload);
	}
};

const getters = {
	getToken: (state) => {
		return state.token;
	}
}

export default {
	state,
	mutations,
	actions,
	getters
};
