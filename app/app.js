import Vue from "nativescript-vue";
import store from './store';

import Home from "./components/Home";

// var authService = require("./auth-service");
// authService.configureOAuthProviders();

new Vue({
	template: `
		<Frame>
				<Home />
		</Frame>`,
	components: {
		Home
	},
	// render: h => h(Home),
	store,
}).$start();
