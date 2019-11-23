<template>
    <Page class="page page--home c-black" actionBarHidden="true" backgroundSpanUnderStatusBar="true">
			<AbsoluteLayout>
				<Label text="ERRROR" />
			</AbsoluteLayout>
			<ScrollView class="panel panel--home" orientation="vertical" scrollBarIndicatorVisible="false" @scroll="onTracksScroll">
				<GridLayout class="" columns="*" rows="200, auto, auto, *">
					
					<FlexboxLayout class="container container-fluid" width="100%" row="0">
						<StackLayout class="row" height="100%">
							<FlexboxLayout flexDirection="column" alignItems="center" justifyContent="flex-end" height="100%">
								<Image class="author__img" src="~/assets/img/authors/author.png"/>
								<Label class="fz-24" :text="author.profile.name" @tap="$navigateTo(Home)"/>
								<Label class="fz-17" :text="author.followersCount"/>
								<Label class="fz-17" :text="id"/>
							</FlexboxLayout>
						</StackLayout>
					</FlexboxLayout>


					<FlexboxLayout class="container container-fluid" width="100%" row="1">
						<StackLayout class="row">
							<PlaylistScroll :playlists="playlists" @nextPage="onNextPagePlaylist"/>
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
		import Home from './Home';
		import PlaylistScroll from '@/components/PlaylistScroll';
		import TrackScroll from '@/components/TrackScroll';
		import TrackScrollMixin from '@/mixins/TrackScrollMixin';
		import AthorService from '@/services/user';
		import PlaylistService from '@/services/playlist';
		import TrackService from '@/services/track';

    export default {
			name: 'Author',
			props: {
				id: String
			},
			components: {
				PlaylistScroll,
				TrackScroll
			},
			mixins: [TrackScrollMixin],
			computed: {
			},
			data() {
				return {
					Home,

					author: {
						profile: {}
					},
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
				async loadAuthor () {
					try {
						const author = await AthorService.getAuthor({
							id: this.id
						});

						this.author = author.data.data;
					} catch (err)  {
						console.log('--- err', err);
					}
				},
				async loadPlaylists (page = 1) {
					try {
						const playlists = await PlaylistService.getPlaylistsByAuthor({
							id: this.id,
							page
						});
						
						this.playlists = playlists.data.data;
					} catch (err) {
						console.dir('--- err', err);
					}
				},
				async loadTracks (page = 1) {
					try {
						const tracks = await TrackService.getTracksByAuthor({
							id: this.id,
							page
						});
						
						this.tracks = tracks.data.data;
					} catch (err) {
						console.log('--- err', err);
					}
				},
			},
			async created () {
				await this.loadAuthor();
				this.loadPlaylists();
				this.loadTracks();
			}
    };
</script>

<style scoped lang="scss">
</style>
