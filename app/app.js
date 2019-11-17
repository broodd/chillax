import Vue from "nativescript-vue";
import store from '@/store';

// import App from './components/App'
import Wellcome from "@/pages/Wellcome";
// import Home from "./pages/Home";

// import Login from "./components/Login";

new Vue({
	// template: `
	// 	<Frame>
	// 			<Wellcome />
	// 	</Frame>
	// `,
	components: {
		Wellcome,
		// App,
		// Home,
		// Login
	},
	// render: h => h(App),
	
	// render: h => h('frame', [h(App)]),
	render: h => h('frame', [h(Wellcome)]),
	store,
}).$start();

Vue.config.silent = false;

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