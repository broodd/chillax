<template>
	<Home v-if="token"/>
	<Wellcome v-else/>
</template>


<script>
	const appSettings = require("tns-core-modules/application-settings");
	import Wellcome from '@/pages/Wellcome';
	import Home from '@/pages/Home';

	export default {
		components: {
			Wellcome,
			Home,
			Login
		},
		data () {
			return {
				
			}
		},
		computed: {
			token () {
				return this.$store.getters.getToken || appSettings.getString('token');
			}
		}
	}
</script>