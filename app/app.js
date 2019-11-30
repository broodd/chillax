import Vue from "nativescript-vue";
import store from '@/store';

// Global mixins
import goToPage from '@/mixins/goToPage';
Vue.mixin(goToPage);

// My global components
import HorizontalScroll from '@/components/HorizontalScroll';
Vue.component('HorizontalScroll', HorizontalScroll);

import VerticalScroll from '@/components/VerticalScroll';
Vue.component('VerticalScroll', VerticalScroll);

import PlaylistButton from '@/components/PlaylistButton';
Vue.component('PlaylistButton', PlaylistButton);

import TrackScroll from '@/components/TrackScroll';
Vue.component('TrackScroll', TrackScroll);

// import App from './components/App';
import App from './components/App';

new Vue({
	components: {
		App,
	},
	render: h => h(App),
	store
}).$start();

Vue.config.silent = false;

