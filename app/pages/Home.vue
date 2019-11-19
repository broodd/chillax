<template>
    <Page class="page page--home c-black" actionBarHidden="true" backgroundSpanUnderStatusBar="true">
			<AbsoluteLayout>
				<Label text="ERRROR" />
			</AbsoluteLayout>
			<ScrollView class="panel panel--home" orientation="vertical" scrollBarIndicatorVisible="false" @scroll="onTracksScroll">
				<GridLayout class="" columns="*" rows="200, auto, auto, *">
					
					<FlexboxLayout class="container container-fluid" width="100%" row="0">
						<StackLayout class="row" height="100%">
							<FlexboxLayout flexDirection="column" justifyContent="flex-end" height="100%">
								<Label class="fz-35" text="Recent playlists"/>
							</FlexboxLayout>
						</StackLayout>
					</FlexboxLayout>


					<FlexboxLayout class="container container-fluid" width="100%" row="1">
						<StackLayout class="row">
							<PlaylistScroll :playlists="playlists" @nextPage="onNextPagePlaylist"/>
						</StackLayout>
					</FlexboxLayout>

					
					<FlexboxLayout class="container container-fluid" width="100%" row="2">
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

				</GridLayout>
			</ScrollView>
    </Page>
</template>

<script>
		import PlaylistScroll from '@/components/PlaylistScroll';
		import TrackScroll from '@/components/TrackScroll';
		import TrackScrollMixin from '@/mixins/TrackScrollMixin';
		import PlaylistService from '@/services/playlist';
		import TrackService from '@/services/track';

    export default {
			components: {
				PlaylistScroll,
				TrackScroll
			},
			mixins: [TrackScrollMixin],
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
					// this.loadPlaylists(page);
				},
				onNextPageTrack (page) {
					// this.loadTracks(page);
				},
				async loadPlaylists (page = 1) {
					try {
						const playlists = await PlaylistService.getPlaylists({
							page
						});
						
						console.log('--- playlists', playlists.data.data);
						this.playlists = playlists.data.data;
					} catch (err) {
						// console.log('--- ', err.response.message);
					}
				},
				async loadTracks (page = 1) {
					try {
						const tracks = await TrackService.getTracks({
							page
						});
						
						this.tracks = tracks.data.data;
					} catch (err) {
						console.log('--- ', err.response.message);
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
</style>
