<template>
    <Page class="page page--home c-black" actionBarHidden="true" backgroundSpanUnderStatusBar="true">
			<ScrollView class="panel panel--home" orientation="vertical" scrollBarIndicatorVisible="false" @scroll="onTracksScroll">
				<GridLayout class="" columns="*" rows="200, auto, auto, *">
					
					<FlexboxLayout class="container container-fluid" width="100%" row="0">
						<StackLayout class="row" height="100%">
							<FlexboxLayout flexDirection="column" justifyContent="flex-end" height="100%">
								<Label class="fz-35" text="Recent playlists"/>
								<!-- <Image src="~/assets/img/logo.png"/> -->
							</FlexboxLayout>
						</StackLayout>
					</FlexboxLayout>


					<FlexboxLayout class="container container-fluid" width="100%" row="1">
						<StackLayout class="row">
							<Label :text="playListPage"></Label>
							<Label :text="playListScroll"></Label>
							<Label :text="maxPlayListScroll"></Label>
							<ScrollView class="playlist-list" orientation="horizontal" scrollBarIndicatorVisible="false" @scroll="onPlayListScroll">
								<StackLayout orientation="horizontal">
									<Button v-for="(playlist, key) in playlists" :key="key" class="playlist-list__btn" :text="playlist + ' ' + (key + 1)"/>
								</StackLayout>
							</ScrollView>
						</StackLayout>
					</FlexboxLayout>

					
					<FlexboxLayout class="container container-fluid" width="100%" row="2">
						<StackLayout class="row" height="100%">
							<FlexboxLayout flexDirection="column" justifyContent="flex-end" height="100%"> -->
								<Label class="fz-35" text="Recent tracks"/>
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
										<Button class="track__like my-fa" text.decode="&#xe802;" :class="{active: key % 2 == 0}"/>
									</FlexboxLayout>
								</StackLayout>
						</StackLayout>
					</FlexboxLayout>

				</GridLayout>
			</ScrollView>
    </Page>
</template>

<script>
		import Wellcome from '@/components/Wellcome';


    export default {
			computed: {
			},
			data() {
				return {
					Wellcome,
					maxPlayListScroll: 0,
					playListScroll: 0,
					playListPage: 1,
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
				onPlayListScroll (args) {
					let elWidth = args.object.scrollableWidth;
					let scroll = args.scrollX
					this.playListScroll = scroll
					if (scroll > this.maxPlayListScroll + 10) {
						this.maxPlayListScroll = elWidth;
						this.playListPage++;
						if (this.playListPage < 3) {
							this.playlists.push('focus')
							this.playlists.push('focus')
							this.playlists.push('focus')
							this.playlists.push('focus')
							this.playlists.push('focus')
						}
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
			},
			created () {
			}
    };
</script>

<style scoped lang="scss">
    // Start custom common variables
    @import '../app-variables';
    // End custom common variables

		// Custom styles
		.playlist-list {
			&__btn {
				margin-right: 10;
				margin-left: 0;
				text-transform: uppercase;
				text-align: center;
				width: 160;
				height: 160;
				font-size: 22;
				letter-spacing: 0.2;
				color: $white;
				// border-radius: 10;
				background-size: cover;
				background-image: url('~/assets/img/playlists/focus.jpg');
				// background-color: lime;
			}
		}

		.track {
			margin-bottom: 10;
			align-items: center;
			justify-content: space-between;
			&__button {
				border-radius: 50%;
				width: 80;
				height: 80;
				background-image: url('~/assets/img/tracks/cover.jpg');
				background-repeat: no-repeat;
				background-size: cover;

				&__circle {
					border-radius: 50%;
					width: 24;
					height: 24;
					background-color: $white;
				}
			}

			&__text {
				margin-left: 20;
				flex: 1 1 100%;
			}
			&__name {
				font-size: 20;
			}
			&__author {
				color: $grey;
			}
			&__like {
				width: 50;
				height: 50;
				font-size: 20;
				color: $grey;
				background-color: $white;
				border-radius: 50%;
				android-elevation: 0;
				&.active {
					color: $tomato;
				}
			}
		}
</style>
