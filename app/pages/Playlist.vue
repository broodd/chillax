<template>
    <Page class="page page--home c-black" actionBarHidden="true" backgroundSpanUnderStatusBar="true">
			<GridLayout columns="*" rows="*, auto" height="100%">
				<VerticalScroll @nextPage="onNextPageTrack">
					<GridLayout class="" columns="*" rows="300, *">
						
						<!-- <FlexboxLayout class="container container-fluid bg--top playlist__header" width="100%" row="0" :backgroundImage="`https://chillax-server.herokuapp.com/static/playlists/${playlist.img}_clip.png`"> -->
						<FlexboxLayout class="container container-fluid bg--top playlist__header" width="100%" row="0" :backgroundImage="`https://chillax-server.herokuapp.com/static/tracks/${playlist.img}.jpg`">
							<StackLayout class="row" height="100%">
								<FlexboxLayout flexDirection="column" alignItems="center" justifyContent="center"  height="100%">
									<Label class="fz-35" :text="playlist.name"/>
									<Label class="fz-24 my-2" :text="playlist.author.profile ? playlist.author.profile.name : 'author'" @tap="goToAuthor()"/>
									<FlexboxLayout alignItems="center">
										<Button class="like my-fa" text.decode="&#xe802;" :class="{active: playlist.liked}" @tap="onLikePlaylist"/>
									</FlexboxLayout>
								</FlexboxLayout>
							</StackLayout>
						</FlexboxLayout>

						<FlexboxLayout class="container container-fluid" width="100%" row="1">
							<StackLayout class="row">
								<TrackList :tracks="tracks"/>
							</StackLayout>
						</FlexboxLayout>

					</GridLayout>
				</VerticalScroll>

				<NavBottom />
				
			</GridLayout>
    </Page>
</template>

<script>
		import AddPlaylist from '@/pages/AddPlaylist';
		import Author from '@/pages/Author';
		import TrackService from '@/services/track';
		import PlaylistService from '@/services/playlist';

    export default {
			name: 'Playlist',
			props: {
				id: String
			},
			components: {
			},
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
					this.$goToPage(Author, {
						id: this.playlist.author._id
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
						}
					} catch (err) {
						alert(err);
					}
				},
				async loadTracks (page = 1) {
					try {
						const tracks = await TrackService.getTracksByPlaylist({
							id: this.id,
							page,
						});
						
						if (tracks.data)
							this.tracks = this.tracks.concat(tracks.data.data);
					} catch (err) {
						alert(err);
					}
				},
				async onLikePlaylist () {
					try {
						const liked = await PlaylistService.likePlaylist({
							id: this.id
						});
						
						this.$set(this.playlist, 'liked', liked.data.data);
					} catch (err) {
						alert(err);
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
