<template>
    <Page class="page page--home c-white" actionBarHidden="true" backgroundSpanUnderStatusBar="true">
			<ScrollView class="panel panel--home" orientation="vertical">
				<GridLayout class="form bg bg--main" columns="*" rows="*, auto">
					
					<FlexboxLayout class="form__top container" width="100%" row="0">
						<StackLayout class="row text-center" height="100%">
							<FlexboxLayout alignItems="center" justifyContent="center" height="100%">
								<Image src="~/assets/img/logo.png"/>
							</FlexboxLayout>
						</StackLayout>
					</FlexboxLayout>


					<FlexboxLayout class="form__bottom container pb-4" width="100%" row="1">
						<StackLayout class="row text-center">
							<Button class="btn green" text="Sign in" @tap="$navigateTo(Login)" />
							<Button class="btn green" text="Home" @tap="$navigateTo(Home)" />
							
							<Label class="mt-2 new-account" text="New Account?" @tap="$navigateTo(Registration)" />
						</StackLayout>
					</FlexboxLayout>

				</GridLayout>
			</ScrollView>
    </Page>
</template>

<script>
		const appSettings = require("tns-core-modules/application-settings");
		import Login from '@/pages/Login';
		import Registration from '@/pages/Registration';
		import Home from '@/pages/Home';
		

    export default {
			components: {
			},
			computed: {
			},
			data() {
				return {
					Home,
					Login,
					Registration,
				}
			},
			created () {
				const token = appSettings.getString('token');
				console.log('--- token', token);

				if (token) {
					console.log('--- nav to home', );
					this.$navigateTo(Home);
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
