<template>
	<GridLayout class="nav" row="4" rows="*" columns="*, *, *, *">
		<Label row="0" col="0" text.decode="&#xe806;" class="my-fa" :class="{ active : activeIndex == 0 }" @tap="goToHome()"/>
		<Label row="0" col="1" text.decode="&#xe802;" class="my-fa" :class="{ active : activeIndex == 1 }" @tap="goToLiked()"/>
		<Label row="0" col="2" text.decode="&#xe805;" class="my-fa" :class="{ active : activeIndex == 2 }" @tap="goToAdd()"/>
		<Label row="0" col="3" text.decode="&#xe808;" class="my-fa" :class="{ active : activeIndex == 3 }" @tap="goToMe()"/>
	</GridLayout>
</template>

<script>
	import Home from '@/pages/Home';
	// import Liked from '@/pages/Liked';
	import AddPlaylist from '@/pages/AddPlaylist';
	// import User from '@/pages/User';

	export default {
		props: {
			activeIndex: {
				type: Number
			}
		},
		methods: {
			goToHome () {
				this.$goToPage(Home);
			},
			goToLiked () {
				this.$goToPage(Home);
			},
			goToAdd () {
				this.$goToPage(AddPlaylist);
			},
			goToMe () {
				this.$goToPage(AddPlaylist);
			}
		}
	}
</script>