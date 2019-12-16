<template>
	<FlexboxLayout
		@tap="goToPlaylist(playlist._id)"
		class="playlist-list__btn"
		:backgroundImage="`https://chillax-server.herokuapp.com/static/tracks/${playlist.img}.jpg`"
		:text="playlist.name"
	>
		<Label class="playlist-list__btn__text" :text="playlist.name"/>
	</FlexboxLayout>
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