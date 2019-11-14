<template>
	<ScrollView class="playlist-list" orientation="horizontal" scrollBarIndicatorVisible="false" @scroll="onPlayListScroll">
		<StackLayout orientation="horizontal">
			<Button
				v-for="(playlist, key) in playlists"
				:key="key"
				@tap="goToPlaylist(key)"
				class="playlist-list__btn"
				:text="playlist + ' ' + (key + 1)"
			/>
		</StackLayout>
	</ScrollView>
</template>

<script>
	import Playlist from './Playlist';

	export default {
		props: {
			playlists: Array
		},
		data() {
			return {
				Playlist,

				maxScroll: 0,
				scroll: 0,
				page: 1,
				// playlists: [
				// 	'Focus',
				// 	'Focus',
				// 	'Focus',
				// 	'Focus',
				// 	'Focus',
				// 	// 'Focus'
				// ],
			}
		},
		methods: {
			onPlayListScroll (args) {
				console.log('--- args.scrollX', args.scrollX);
				// let elWidth = args.object.scrollableWidth;
				// let scroll = args.scrollX;
				// this.scroll = scroll;
				// console.log('--- this.scroll', this.scroll);
				// if (scroll > this.maxScroll + 10) {
				// 	this.maxScroll = elWidth;
				// 	this.page++;
				// 	// if (this.page < 3) {
				// 		this.$emit('nextPage', { page })
				// 	// }
				// }
			},
			goToPlaylist (id) {
				this.$navigateTo(Playlist, {
					props: {
						id
					}
				})
			},
		}
	}
</script>