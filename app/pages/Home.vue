<template>
    <Page class="page page--home c-black" actionBarHidden="true" backgroundSpanUnderStatusBar="true"  androidStatusBarBackground="#04303C">
			<GridLayout columns="*" rows="*, auto" height="100%">
				<VerticalScroll @nextPage="onNextPageTrack">
					<GridLayout class="" columns="*" rows="250, auto, auto, *">
						<FlexboxLayout class="container container-fluid bg bg--top home__header" width="100%" row="0">
							<StackLayout class="row" height="100%">
								<FlexboxLayout flexDirection="column" justifyContent="flex-end" height="100%">
									<Label class="fz-35" text="Recent playlists"/>
								</FlexboxLayout>
							</StackLayout>
						</FlexboxLayout>


						<FlexboxLayout class="container container-fluid" width="100%" row="1">
							<StackLayout class="row">
								<HorizontalScroll @nextPage="onNextPagePlaylist" class="playlist-list">
									<PlaylistButton
										v-for="playlist of playlists"
										:key="playlist._id"
										:playlist="playlist"
									/>
								</HorizontalScroll>
							</StackLayout>
						</FlexboxLayout>

						
						<FlexboxLayout class="container container-fluid my-2" width="100%" row="2">
							<StackLayout class="row" height="100%">
								<FlexboxLayout flexDirection="column" justifyContent="flex-end" height="100%">
									<Label class="fz-35" text="Tracks"/>
								</FlexboxLayout>
							</StackLayout>
						</FlexboxLayout>


						<FlexboxLayout class="container container-fluid" width="100%" row="3">
							<StackLayout class="row">
								<TrackList :tracks="tracks"/>
							</StackLayout>
						</FlexboxLayout>
					</GridLayout>
				</VerticalScroll>

				<NavBottom activeIndex="0"/>
				
			</GridLayout>
    </Page>
</template>

<script>
		import PlaylistService from '@/services/playlist';
		import TrackService from '@/services/track';

    export default {
			name: 'Home',
			components: {
			},
			computed: {
			},
			data() {
				return {
					playlists: [],
					tracks: []
				}
			},
			methods: {
				onNextPagePlaylist (page) {
					this.loadPlaylists(page);
				},
				onNextPageTrack (page) {
					this.loadTracks(page);
				},
				async loadPlaylists (page = 1) {
					try {
						const playlists = await PlaylistService.getPlaylists({
							page
						});

						if (playlists.data)
							this.playlists = this.playlists.concat(playlists.data.data);
					} catch (err) {
						console.log('--- err', err);
					}
				},
				async loadTracks (page = 1) {
					try {
						const tracks = await TrackService.getTracks({
							page
						});

						if (tracks.data)
							this.tracks = this.tracks.concat(tracks.data.data);
					} catch (err) {
						console.log('--- err', err);
					}
				}
			},
			created () {
				this.loadPlaylists()
				this.loadTracks()
			}
    };
</script>

<style scoped lang="scss">
    // Start custom common variables
    @import '../app-variables';
    // End custom common variables

		.home {
			&__header {
				background-image: url('~/assets/img/main_bg_clip.png');
				background-position: center bottom;
			}
		}
		// 	text-align: center;
		// 	background-position: center bottom;
		// 	color: $white;
		// 	padding-bottom: 20;
		// }

		.page--home {
			background-color: #F1F2F5;
		}
</style>
