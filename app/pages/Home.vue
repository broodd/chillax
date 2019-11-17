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
								<Label class="fz-35" text="Recent playlists" @tap="clicked"/>
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
							<FlexboxLayout flexDirection="column" justifyContent="flex-end" height="100%"> -->
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
		import axios from 'axios';
		import PlaylistScroll from '@/components/PlaylistScroll';
		import TrackScroll from '@/components/TrackScroll';
		import TrackScrollMixin from '@/mixins/TrackScrollMixin';

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
					playlists: [
						'Focus',
						'Focus',
						'Focus',
						'Focus',
						'Focus',
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
				clicked () {
					console.log('--- axios --here', );
					// http.get(`https://jsonplaceholder.typicode.com/todos/1`)
					// 	.then(response => response.json())
					// 	.then(json => console.log(json))
					// http.request({
					// 	url: "http://localhost:3000",
					// 	method: "GET"
					// }).then((r) => {
					// 		console.log('--- r', r);
					// 	},
					// 	(e) => {
					// 		console.log('--- e', e);
					// });

					axios.get('https://jsonplaceholder.typicode.com/todos/1')
					.then(response => {
								console.log('--- response', response);
					})
					.catch(error => {
						console.log(error);
					})

					// fetch("http://localhost:3000/login")
					// .then((response) => response.json())
					// .then((r) => {
					// 		console.log('--- r', r.json);
					// }).catch((err) => {
					// });
				}
			}
    };
</script>

<style scoped lang="scss">
    // Start custom common variables
    @import '../app-variables';
    // End custom common variables
</style>
