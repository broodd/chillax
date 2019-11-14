<template>
    <Page class="page page--home c-black" actionBarHidden="true" backgroundSpanUnderStatusBar="true">
			<ScrollView class="panel panel--home" orientation="vertical" scrollBarIndicatorVisible="false" @scroll="onTracksScroll">
				<GridLayout class="" columns="*" rows="300, *">
					
					<FlexboxLayout class="container container-fluid playlist__header" width="100%" row="0" style="background-image: url('~/assets/img/playlists/focus.jpg')">
						<StackLayout class="row" height="100%">
							<FlexboxLayout flexDirection="column" alignItems="center" justifyContent="space-around"  height="100%">
								<Label class="fz-35" :text="name + ' ' + id" @tap="$navigateTo(Home)"/>
								<FlexboxLayout alignItems="center">
									<Button class="like my-fa" text.decode="&#xe802;" :class="'active'"/>
								</FlexboxLayout>
								<Label class="fz-24" text="author" @tap="goToAuthor(123)"/>
							</FlexboxLayout>
						</StackLayout>
					</FlexboxLayout>

					<FlexboxLayout class="container container-fluid" width="100%" row="1">
						<StackLayout class="row">
								<StackLayout orientation="vertical">
									<FlexboxLayout v-for="(playlist, key) in tracks" :key="key" class="track" width="100%">
										<AbsoluteLayout class="track__button">
											<Button class="track__button__circle" left="28" top="28"/>
										</AbsoluteLayout>
										<StackLayout class="track__text">
											<Label class="track__name" :text="'Focus #' + key" />
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
		import Home from './Home';
		import Author from './Author';
		import axios from 'axios';

    export default {
			props: {
				id: String
			},
			components: {
				
			},
			computed: {
			},
			data() {
				return {
					Home,
					Author,

					name: 'Focus on one',

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
				goToAuthor (id) {
					this.$navigateTo(Author, {
						props: {
							id
						}
					})
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
			},
    };
</script>

<style scoped lang="scss">
    // Start custom common variables
    @import '../app-variables';
    // End custom common variables
</style>
