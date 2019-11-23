<template>
	<StackLayout orientation="vertical">
		<FlexboxLayout v-for="(track, index) in tracks" :key="track._id" class="track" width="100%">
			<AbsoluteLayout class="track__button">
				<Button class="track__button__circle" left="28" top="28"/>
			</AbsoluteLayout>
			<StackLayout class="track__text">
				<Label class="track__name" :text="track.name" />
			</StackLayout>
			<Button class="like my-fa" text.decode="&#xe802;" :class="{active: track.liked}" @tap="onLikeTrack(track._id, index)"/>
		</FlexboxLayout>
	</StackLayout>
</template>

<script>
	import TrackService from '@/services/track';

	export default {
		props: {
			tracks: Array
		},
		data() {
			return {
			}
		},
		methods: {
			async onLikeTrack (id, index) {
				try {
					const liked = await TrackService.likePlaylist({
						id
					});
					
					this.$set(this.tracks[index], 'liked', liked.data.data);
				} catch (err) {
					console.log('--- ', err.response.message);
				}
			}
		}
	}
</script>