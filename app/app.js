import Vue from "nativescript-vue";
import store from '@/store';


// my components
import HorizontalScroll from '@/components/HorizontalScroll';
Vue.component('HorizontalScroll', HorizontalScroll);

import VerticalScroll from '@/components/VerticalScroll';
Vue.component('VerticalScroll', VerticalScroll);

import PlaylistButton from '@/components/PlaylistButton';
Vue.component('PlaylistButton', PlaylistButton);

import TrackScroll from '@/components/TrackScroll';
Vue.component('TrackScroll', TrackScroll);

import App from './components/App';
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
