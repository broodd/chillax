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
								<Label class="fz-24" :text="'author ' + id" @tap="$navigateTo(Home)"/>
								<Label class="fz-17" :text="'Followers ' + 15"/>
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
		import axios from 'axios';
		import Home from './Home';
		import PlaylistScroll from '@/components/PlaylistScroll';
		import TrackScroll from '@/components/TrackScroll';
		import TrackScrollMixin from '@/mixins/TrackScrollMixin';

    export default {
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

					playlists: [
						'Focus',
						'Focus',
						'Focus',
						'Focus',
						'Focus',
						// 'Focus'
					],
					tracks: [
						'Focus',
						'Focus',
						'Focus',
						'Focus',
						'Focus',
					]
				}
			},
			methods: {
				onNextPagePlaylist (page) {
					this.playlists.push('focus')
					this.playlists.push('focus')
					this.playlists.push('focus')
					this.playlists.push('focus')
					this.playlists.push('focus')
				},
				onNextPageTrack (page) {
					this.tracks.push('focus')
					this.tracks.push('focus')
					this.tracks.push('focus')
					this.tracks.push('focus')
					this.tracks.push('focus')
				},
			},
    };
</script>

<style scoped lang="scss">
    // Start custom common variables
    @import '../app-variables';
    // End custom common variables
</style>
