<template>
	<StackLayout orientation="vertical" v-if="tracks && tracks.length">
		<Track
			v-for="(track, index) in tracks"
			:key="track._id"
			:index="index"
			:track="track"
			:stage="nowPlaying == index"
			:paused="paused"
			class="track"
			@likeTrack="onLikeTrack"
			@playTrack="onPlayTrack"
		/>
			<!-- :stage="nowPlayingId == track._id" -->
	</StackLayout>
	<ActivityIndicator v-else busy="true" />
</template>

<script>
	import Author from '@/pages/Author';
	import Track from '@/components/Track';
	import TrackService from '@/services/track';
	const audioPlayer = require('nativescript-audio');
	const player = new audioPlayer.TNSPlayer();

	export default {
		name: 'TrackList',
		props: {
			tracks: Array
		},
		components: {
			Track
		},
		data() {
			return {
				nowPlaying: undefined,
				paused: false,
				countPlaying: 0,
				Author
			}
		},
		// computed: {
		// 	nowPlayingId () {
		// 		return this.$store.getters.getNowPlayingId;
		// 	}
		// },
		methods: {
			async onPlayTrack (index) {
				try {
					const track = this.tracks[index];

					if (this.paused == true && this.nowPlaying == index) {
						console.log('--- playing, need pause', index, track.src);
						player.pause();
						this.paused = false;
					} else {
						if (this.countPlaying > 1 && this.nowPlaying == index) {
							console.log('--- stoped, need resume', index, track.src);
							player.resume();
							this.paused = true;
						} else {
							console.log('--- stoped, need start (next)', index, track.src);
							const playerOptions = {
								audioFile: `http://192.168.0.104:3000/static/audio/${track.src}`,
								loop: false,
								completeCallback: () => {
									console.log('finished playing');
									if (!this.tracks && !this.tracks.length)
										return;

									if (this.nowPlaying == this.tracks.length) {
										// emit next page
										// else
										this.nowPlaying = 0;
										// this.$store.dispatch('setNowPlayingId', undefined);
										return;
									} else {
										this.nowPlaying++;
									}
									this.paused = false;
									this.countPlaying = 0;

									if (this.tracks.length > 1)
										this.onPlayTrack(this.nowPlaying);
								},
								errorCallback: (errorObject) => {
									console.log(JSON.stringify(errorObject));
								},
								infoCallback: (args) => {
									console.log(JSON.stringify(args));
								}
							};

							player
								.playFromFile(playerOptions)
								.then(() => {
									// this.$store.dispatch('setNowPlayingId', track._id);
									this.paused = true;
									this.nowPlaying = index;
									this.countPlaying++;
								})
						}
					}
				} catch (err) {
					console.log('something went wrong...', err);
					
					this.paused = false;
				}
			},
			async onLikeTrack (id, index) {
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