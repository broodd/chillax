<template>
    <Page class="page page--home c-black" actionBarHidden="true" backgroundSpanUnderStatusBar="true">
			<ScrollView class="panel panel--home" orientation="vertical">
				<GridLayout class="" columns="*" rows="200, auto">
					
					<FlexboxLayout class="container container-fluid" width="100%" row="0">
						<StackLayout class="row" height="100%">
							<FlexboxLayout flexDirection="column" justifyContent="flex-end" height="100%">
								<Label class="fz-35" text="Popular playlists" @tap="$navigateTo(Wellcome)"/>
								<Label class="fz-17" text="Good Morning"/>
								<!-- <Image src="~/assets/img/logo.png"/> -->
							</FlexboxLayout>
						</StackLayout>
					</FlexboxLayout>


					<FlexboxLayout class="container container-fluid" width="100%" row="1">
						<StackLayout class="row">
							<Label :text="playListScroll"></Label>
							<Label :text="maxPlayListScroll"></Label>
							<ScrollView ref="playlist_list" class="playlist-list" orientation="horizontal" scrollBarIndicatorVisible="false" @scroll="onPlayListScroll">
								<StackLayout orientation="horizontal">
									<Button class="playlist-list__btn" text="Focus"/>
									<Button class="playlist-list__btn" text="Focus"/>
									<Button class="playlist-list__btn" text="Focus"/>
									<Button class="playlist-list__btn" text="Focus"/>
									<Button class="playlist-list__btn" text="Focus"/>
									<Button class="playlist-list__btn" text="Focus"/>
								</StackLayout>
							</ScrollView>
							<!-- <Label :text="state"></Label>
							<Button class="btn" text="Sign in" @tap="$navigateTo(Login)" />
							<Button class="btn green" text="Sign in with google" @tap="login('google')" />
							<Button class="btn blue" text="Sign in with facebook" @tap="login('facebook')" />
							<Button class="btn tomato" text="Log out" @tap="logOut()" />
							
							<Label class="mt-2 new-account" text="New Account?" @tap="$navigateTo(Login)" /> -->
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
					maxPlayListScroll: (5 * (160 + 10)) - 300,
					playListScroll: 0
				}
			},
			methods: {
				onPlayListScroll (args) {
					let scroll = args.scrollX
					let elements = 6
					this.playListScroll = scroll
					if (scroll >= this.maxPlayListScroll) {
						alert({
							title: "Your title",
							message: "Your message",
							okButtonText: "Your OK button text"
						})
						this.maxPlayListScroll += (5 * (160 + 10)) - 300
					}
				}
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
</style>
