import Vue from "nativescript-vue";
import store from '@/store';


import PlaylistScroll from '@/components/PlaylistScroll';
Vue.component('PlaylistScroll', PlaylistScroll);

import TrackScroll from '@/components/TrackScroll';
Vue.component('TrackScroll', TrackScroll);

// import App from './components/App';
import Wellcome from "@/pages/Wellcome";

new Vue({
	components: {
		Wellcome,
		// App,
	},
	// render: h => h(App),
	// render: h => h('frame', [h(App)]),
	
	render: h => h('frame', [h(Wellcome)]),
	store,
}).$start();

Vue.config.silent = false;
