<template>
	<Button
		@tap="goToPlaylist(playlist._id)"
		class="playlist-list__btn"
		:text="playlist.name"
	/>
</template>

<script>
	import Playlist from '@/pages/Playlist';

	export default {
		name: 'PlaylistButton',
		props: {
			playlist: Object
		},
		data() {
			return {
			}
		},
		methods: {
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