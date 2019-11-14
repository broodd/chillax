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
							<PlaylistScroll :playlists="playlists" @nextPage="onNextPage"/>
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
							<Label :text="trackPage"></Label>
							<Label :text="tracksScroll"></Label>
							<Label :text="maxTracksScroll"></Label>
								<StackLayout orientation="vertical">
									<FlexboxLayout v-for="(playlist, key) in tracks" :key="key" class="track" width="100%">
										<!-- <Button class="track__button"/> -->
										<AbsoluteLayout class="track__button">
											<!-- <Button class="track__button__circle my-fa" text.decode="&#xe801;" /> -->
											<Button class="track__button__circle" left="28" top="28"/>
											<!-- <Label left="30" top="40" width="100" height="100" backgroundColor="#43b883"/> -->
										</AbsoluteLayout>
										<StackLayout class="track__text">
											<Label class="track__name" text="Focus 1" />
											<Label class="track__author" text="some petro" />
										</StackLayout>
										<Button class="like my-fa" text.decode="&#xe802;" :class="{active: key % 2 == 0}"/>
									</FlexboxLayout>
								</StackLayout>
						</StackLayout>
					</FlexboxLayout>

				</GridLayout>
			</ScrollView>
    </Page>
</template>

<script>
		import PlaylistScroll from '@/components/PlaylistScroll';
		import axios from 'axios';

    export default {
			components: {
				PlaylistScroll
			},
			computed: {
			},
			data() {
				return {
					Playlist,

					// maxPlayListScroll: 0,
					// playListScroll: 0,
					// playListPage: 1,
					playlists: [
						'Focus',
						'Focus',
						'Focus',
						'Focus',
						'Focus',
						// 'Focus'
					],
					maxTracksScroll: 0,
					tracksScroll: 0,
					trackPage: 1,
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
				onNextPage ({ page }) {
					console.log('--- page', page);
					if (page < 3) {
						this.playlists.push('focus')
						this.playlists.push('focus')
						this.playlists.push('focus')
						this.playlists.push('focus')
						this.playlists.push('focus')
					}
				},
				onTracksScroll (args) {
					let elWidth = args.object.scrollableHeight;
					let scroll = args.scrollY
					this.tracksScroll = scroll
					if (scroll > this.maxTracksScroll + 10) {
						this.maxTracksScroll = elWidth;
						this.trackPage++;
						if (this.trackPage < 3) {
							this.tracks.push('focus')
							this.tracks.push('focus')
							this.tracks.push('focus')
							this.tracks.push('focus')
							this.tracks.push('focus')
						}
					}
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
			},
    };
</script>

<style scoped lang="scss">
    // Start custom common variables
    @import '../app-variables';
    // End custom common variables
</style>
