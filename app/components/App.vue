<template>
	<Wellcome />

	<!-- <BottomNavigation>
		<TabStrip v-if="false">
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
	</BottomNavigation> -->
</template>


<script>
	import Wellcome from '@/pages/Wellcome';
	import Home from '@/pages/Home';
	import Login from '@/pages/Login';

	export default {
		components: {
			Wellcome,
			Home,
			Login
		},
		data () {
			return {
				
			}
		}
	}
</script>