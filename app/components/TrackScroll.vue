<template>
	<StackLayout orientation="vertical">
		<Track v-for="(track, index) in tracks" :key="track._id" :index="index" :track="track" class="track" @likeTrack="onLikeTrack" />
	</StackLayout>
</template>

<script>
	import Author from '@/pages/Author';
	import Track from '@/components/Track';
	import TrackService from '@/services/track';

	export default {
		name: 'TrackScroll',
		props: {
			tracks: Array
		},
		components: {
			Track
		},
		data() {
			return {
				Author
			}
		},
		methods: {
			async onLikeTrack (id, index) {
				console.log('--- like', );
				try {
					const liked = await TrackService.likePlaylist({
						id
					});
					
					this.$set(this.tracks[index], 'liked', liked.data.data);
				} catch (err) {
					console.log('--- ', err.response.message);
				}
			},
			goToAuthor (id) {
				this.$navigateTo(Author, {
					props: {
						id
					}
				})
			},
		}
	}
</script>