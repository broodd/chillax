<template>
    <Page class="page page--home c-white" actionBarHidden="true" backgroundSpanUnderStatusBar="true">
			<ScrollView class="panel panel--home" orientation="vertical">
				<GridLayout class="form bg bg--main" :class="{'form-active': state == 'home'}" columns="*" rows="*, auto">
					
					<FlexboxLayout class="form__top container" width="100%" row="0">
						<StackLayout class="row text-center" height="100%">
							<FlexboxLayout alignItems="center" justifyContent="center" height="100%">
								<Image src="~/assets/img/logo.png"/>
							</FlexboxLayout>
						</StackLayout>
					</FlexboxLayout>


					<FlexboxLayout class="form__bottom container pb-4" width="100%" row="1">
						<StackLayout class="row text-center">
							<Label :text="token" />
							<Button class="btn" text="Sign in" @tap="$navigateTo(Login)" />
							<Button class="btn green" text="Sign in with google" @tap="login('google')" />
							<Button class="btn blue" text="Sign in with facebook" @tap="login('facebook')" />
							<Button class="btn tomato" text="Log out" @tap="logOut()" />
							
							<Label class="mt-2 new-account" text="New Account?" @tap="$navigateTo(Login)" />
						</StackLayout>
					</FlexboxLayout>

					<!-- <FlexboxLayout v-if="state == 'home'" class="form__bottom container pb-4" width="100%" row="1">
						<StackLayout class="row text-center">
							<Button class="btn" text="Sign in" @tap="changeState('login')" />
							<Button class="btn green" text="Sign in with google" @tap="changeState('login')" />
							<Button class="btn blue" text="Sign in with facebook" @tap="changeState('login')" />
							
							<Label class="mt-2 new-account" text="New Account?" @tap="changeState('login')" />
						</StackLayout>
					</FlexboxLayout>
					<FlexboxLayout v-if="state == 'login'" class="form__bottom container pb-4" width="100%" row="1">
						<StackLayout class="row text-center">
							<Button class="close my-fa" text.decode="&#xe801;" @tap="changeState('home')" />

							<TextField class="field" v-model="email" hint="EMAIL" />
							<TextField class="field" v-model="email" hint="PASSWORD" />

							<Button class="btn shadow" text="Sign in" @tap="changeState('home')" />
							
							<Label class="mt-2 new-account" text="New Account?" @tap="changeState('home')" />
						</StackLayout>
					</FlexboxLayout> -->

				</GridLayout>
			</ScrollView>
    </Page>
</template>

<script>
		import Login from '@/components/Login';
		// var authService = require("@/auth-service");
		

    export default {
			computed: {
				token () {
					return Object.keys(this.$store.getters.getToken || {}).join(' ')
					// return this.$store.getters.getToken
				}
			},
			data() {
				return {
					Login,
					state: 'home'
				}
			},
			methods: {
				changeState (state) {
					this.state = state
				},
				login (type) {
					

					// authService.tnsOauthLogin(type)
					// 	.then((token) => {
					// 		this.$store.dispatch('setToken', token)
					// 	});
				},
				logOut () {
					// authService.tnsOauthLogout();
				}
			}
    };
</script>

<style scoped lang="scss">
    // Start custom common variables
    @import '../app-variables';
    // End custom common variables

		// Custom styles
</style>
