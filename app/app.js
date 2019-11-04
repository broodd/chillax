import Vue from "nativescript-vue";
import store from './store';
// const firebase = require("nativescript-plugin-firebase");
// const firebaseWebApi = require("nativescript-plugin-firebase/app");

// firebase.init({
// 	// Optionally pass in properties for database, authentication and cloud messaging,
// 	// see their respective docs.
// }).then(
// 	function () {
// 		console.log("firebase.init done");
// 		console.log("[*] Firebase was successfully initialised");
// 	},
// 	function (error) {
// 		console.log("firebase.init error: " + error);
// 	}
// );

// var authService = require("./auth-service");
// authService.configureOAuthProviders();


import Wellcome from "./components/Wellcome";
import Home from "./components/Home";

// import Login from "./components/Login";

new Vue({
	template: `
		<Frame>
				<Home />
		</Frame>
	`,
	components: {
		Wellcome,
		Home,
		// Login
	},
	// render: h => h(Home),
	store,
}).$start();

Vue.config.silent = true;

{/* <BottomNavigation>
	<TabStrip>
		<TabStripItem>
			<Label text="Home"></Label>
		</TabStripItem>
		<TabStripItem>
			<Label text="Login"></Label>
		</TabStripItem>
	</TabStrip>

	<TabContentItem>
		<Frame>
			<Wellcome />
		</Frame>
	</TabContentItem>

	<TabContentItem>
		<Frame>
			<Login />
		</Frame>
	</TabContentItem>
</BottomNavigation> */}