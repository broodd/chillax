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

import TrackList from '@/components/TrackList';
Vue.component('TrackList', TrackList);

import NavBottom from '@/components/NavBottom';
Vue.component('NavBottom', NavBottom);

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

