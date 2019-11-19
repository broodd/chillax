<template>
    <Page class="page page--home c-black" actionBarHidden="true" backgroundSpanUnderStatusBar="true">
			<ScrollView class="panel panel--home" orientation="vertical" scrollBarIndicatorVisible="false" @scroll="onTracksScroll">
				<GridLayout class="" columns="*" rows="300, *">
					
					<FlexboxLayout class="container container-fluid playlist__header" width="100%" row="0" style="background-image: url('~/assets/img/playlists/focus.jpg')">
						<StackLayout class="row" height="100%">
							<FlexboxLayout flexDirection="column" alignItems="center" justifyContent="space-around"  height="100%">
								<Label class="fz-35" :text="playlist.name" @tap="$navigateTo(Home)"/>
								<FlexboxLayout alignItems="center">
									<Button class="like my-fa" text.decode="&#xe802;" :class="{active: playlist.liked}"/>
								</FlexboxLayout>
								<Label class="fz-24" text="author" @tap="goToAuthor(playlist.author)"/>
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
		import Home from '@/pages/Home';
		import Author from '@/pages/Author';
		import TrackScroll from '@/components/TrackScroll';
		import TrackScrollMixin from '@/mixins/TrackScrollMixin';
		import TrackService from '@/services/track';
		import PlaylistService from '@/services/playlist';

    export default {
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
					Home,
					Author,

					playlist: {},
					tracks: []
				}
			},
			methods: {
				goToAuthor (id) {
					this.$navigateTo(Author, {
						props: {
							id
						}
					})
				},
				onNextPageTrack (page) {
					this.loadPlaylist(page);
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
				},
				async loadPlaylist () {
					try {
						const playlist = await PlaylistService.getPlaylist({
							id: this.id
						});
						
						console.log('--- playlists.data.data', playlists.data.data);
						this.playlist = playlists.data.data;
					} catch (err) {
						console.log('--- ', err.response.message);
					}
				},
			},
			created () {
				console.log('--- this.id', this.id);
				this.loadPlaylist();
			}
    };
</script>

<style scoped lang="scss">
    // Start custom common variables
    @import '../app-variables';
    // End custom common variables
</style>
