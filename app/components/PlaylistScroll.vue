<template>
	<ScrollView class="playlist-list" orientation="horizontal" scrollBarIndicatorVisible="false" @scroll="onPlayListScroll">
		<StackLayout orientation="horizontal">
			<Button
				v-for="playlist in playlists"
				:key="playlist._id"
				@tap="goToPlaylist(playlist._id)"
				class="playlist-list__btn"
				:text="playlist.name"
			/>
		</StackLayout>
	</ScrollView>
</template>

<script>
	import Playlist from '@/pages/Playlist';

	export default {
		props: {
			playlists: Array
		},
		data() {
			return {
				Playlist,

				maxScroll: 0,
				page: 1,
			}
		},
		methods: {
			onPlayListScroll (args) {
				let elWidth = args.object.scrollableWidth;
				let scroll = args.scrollX;
				if (scroll > this.maxScroll + 10) {
					this.maxScroll = elWidth;
					this.page++;
					this.$emit('nextPage', this.page)
				}
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