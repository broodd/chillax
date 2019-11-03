const state = {
	token: undefined
};

const mutations = {
	setToken(state, token) {
		state.token = token
	}
};

const actions = {
	setToken: ({ commit }, payload) => {
		commit('setToken', payload)
	}
};

const getters = {
	getToken: (state) => {
		return state.token
	}
}

export default {
	state,
	mutations,
	actions,
	getters
};
