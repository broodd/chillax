<template>
    <Page class="page page--home c-black" actionBarHidden="true" backgroundSpanUnderStatusBar="true">
			<ScrollView class="panel panel--home" orientation="vertical" scrollBarIndicatorVisible="false" @scroll="onTracksScroll">
				<GridLayout class="" columns="*" rows="300, *">
					
					<FlexboxLayout class="container container-fluid bg--top playlist__header" width="100%" row="0" style="background-image: url('~/assets/img/playlists/focus_more_big_clip.png')">
						<StackLayout class="row" height="100%">
							<FlexboxLayout flexDirection="column" alignItems="center" justifyContent="center"  height="100%">
								<Label class="fz-35" :text="playlist.name" @tap="$navigateTo(AddPlaylist)"/>
								<Label class="fz-24 my-2" :text="'awd ' + !!playlist.author._id" @tap="goToAuthor()"/>
								<FlexboxLayout alignItems="center">
									<Button class="like my-fa" text.decode="&#xe802;" :class="{active: playlist.liked}" @tap="onLikePlaylist"/>
								</FlexboxLayout>
							</FlexboxLayout>
						</StackLayout>
					</FlexboxLayout>

					<FlexboxLayout class="container container-fluid" width="100%" row="1">
						<StackLayout class="row">
							<TrackScroll :tracks="tracks"/>
						</StackLayout>
					</FlexboxLayout>

				</GridLayout>
			</ScrollView>
    </Page>
</template>

<script>
		import AddPlaylist from '@/pages/AddPlaylist';
		import Author from '@/pages/Author';
		import TrackScroll from '@/components/TrackScroll';
		import TrackScrollMixin from '@/mixins/TrackScrollMixin';
		import TrackService from '@/services/track';
		import PlaylistService from '@/services/playlist';

    export default {
			name: 'Playlist',
			props: {
				id: String
			},
			components: {
				TrackScroll
			},
			mixins: [TrackScrollMixin],
			computed: {
			},
			data() {
				return {
					AddPlaylist,
					Author,

					playlist: {
						author: {}
					},
					tracks: []
				}
			},
			methods: {
				goToAuthor () {
					this.$navigateTo(Author, {
						props: {
							id: this.playlist.author._id
						}
					})
				},
				onNextPageTrack (page) {
					this.loadTracks(page);
				},
				
				async loadPlaylist () {
					try {
						const playlist = await PlaylistService.getPlaylist({
							id: this.id
						});
						
						if (playlist.data.data[0]) {
							this.playlist = playlist.data.data[0];
						} else {
							console.log('--- Not found', );
						}
					} catch (err) {
						console.log('--- ', err.response.message);
					}
				},
				async loadTracks (page = 1) {
					try {
						const tracks = await TrackService.getTracksByPlaylist({
							id: this.id,
							page,
						});
						
						this.tracks = tracks.data.data;
					} catch (err) {
						console.log('--- ', err.response.message);
					}
				},
				async onLikePlaylist () {
					try {
						const liked = await PlaylistService.likePlaylist({
							id: this.id
						});
						
						this.$set(this.playlist, 'liked', liked.data.data);
						console.log('--- this.playlist.liked', this.playlist.liked);
					} catch (err) {
						console.log('--- ', err.response.message);
					}
				}
			},
			created () {
				this.loadPlaylist();
				this.loadTracks();
			}
    };
</script>

<style scoped lang="scss">
    // Start custom common variables
    @import '../app-variables';
    // End custom common variables
</style>
