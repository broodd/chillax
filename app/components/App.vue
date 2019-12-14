<template>
	<Frame>
		<Wellcome v-if="!token"/>
		<Home v-else/>
	</Frame>
</template>


<script>
	const appSettings = require("tns-core-modules/application-settings");
	import Wellcome from '@/pages/Wellcome';
	import Home from '@/pages/Home';

	export default {
		components: {
			Wellcome,
			Home
		},
		data () {
			return {
				
			}
		},
		computed: {
			token () {
				return appSettings.getString('token') || '';
			}
		},
		// created () {
		// 	appSettings.setString('token', '');
		// }
	}
</script>