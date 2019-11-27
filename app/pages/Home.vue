<template>
    <Page class="page page--home c-black" actionBarHidden="true" backgroundSpanUnderStatusBar="true"  androidStatusBarBackground="#04303C">
			<VerticalScroll @nextPage="onNextPageTrack">
				<GridLayout class="" columns="*" rows="250, auto, auto, *, auto">
					<AbsoluteLayout row="0">
						<Label text="ERRROR" />
					</AbsoluteLayout>
					
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
									v-for="playlist in playlists"
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
							<TrackScroll :tracks="tracks"/>
						</StackLayout>
					</FlexboxLayout>
					
					<!-- <FlexboxLayout row="7" alignItems="center" flexDirection="row" id="bottom-nav"> -->
					<GridLayout row="4" rows="*" columns="*">
						<GridLayout row="0" col="0" rows="*" columns="*, *, *, *, *"
							class="nav">
								<Label row="0" col="0" text="Home" class="my-fa active"></Label>
								<Label row="0" col="1" text="Liked" class="my-fa" @tap="goToLiked()"></Label>
								<Label row="0" col="2" text="Me" class="my-fa" @tap="goToMe()"></Label>
								<Label row="0" col="3" text="Add" class="my-fa"></Label>
						</GridLayout>
					</GridLayout>
				</GridLayout>
			</VerticalScroll>
    </Page>
</template>

<script>
		import TrackScroll from '@/components/TrackScroll';
		import PlaylistService from '@/services/playlist';
		import TrackService from '@/services/track';

    export default {
			name: 'Home',
			components: {
				TrackScroll,
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
						
						this.playlists = playlists.data.data;
					} catch (err) {
						console.dir('--- err', err);
					}
				},
				async loadTracks (page = 1) {
					try {
						const tracks = await TrackService.getTracks({
							page
						});
						
						this.tracks = tracks.data.data;
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
