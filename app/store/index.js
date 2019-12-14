import Vue from 'nativescript-vue';
import Vuex from 'vuex';

import user from './modules/user';
import track from './modules/track';

Vue.use(Vuex);

const debug = 'debug';

const store = new Vuex.Store({
	modules: {
		user,
		// track
	},
	strict: debug,
});

Vue.prototype.$store = store;

export default store;