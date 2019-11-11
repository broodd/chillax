import Vue from 'nativescript-vue';
import Vuex from 'vuex';

import user from './modules/user';

Vue.use(Vuex);

const debug = 'debug';

const store = new Vuex.Store({
	modules: {
		user
	},
	strict: debug,
});

Vue.prototype.$store = store;

export default store;