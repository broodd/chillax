<template>
    <Page class="page page--home bg bg--cream c-white" actionBarHidden="true" backgroundSpanUnderStatusBar="true">
			<ScrollView class="panel panel--home" orientation="vertical">
				<GridLayout columns="*" rows="*, auto" width="100%" height="100%">

					<FlexboxLayout class="form__top container bg bg--clip" width="100%" row="0">
						<StackLayout class="row text-center" height="100%">
							<FlexboxLayout alignItems="center" justifyContent="center" height="100%" width="100%">
								<Image src="~/assets/img/logo.png"/>
							</FlexboxLayout>
						</StackLayout>
					</FlexboxLayout>

					<FlexboxLayout class="form__bottom container pb-4" width="100%" row="1">
						<StackLayout class="row text-center">
							<Button class="close my-fa" text.decode="&#xe801;" @tap="$navigateTo(Wellcome)" />

							<TextField class="field" v-model="email" hint="EMAIL" keyboardType="email"/>
							<TextField class="field" v-model="password" hint="PASSWORD" :secure="true"/>

							<Button class="btn green shadow" text="Sign in" @tap="onLogin" />
							
							<Label class="mt-2 new-account" text="New Account?" @tap="$navigateTo(Registration)" />
						</StackLayout>
					</FlexboxLayout>
					
				</GridLayout>
			</ScrollView>
    </Page>
</template>

<script>
		import Wellcome from '@/pages/Wellcome';
		import Registration from '@/pages/Registration';
		import AuthService from '@/services/auth';

    export default {
        computed: {
				},
				data() {
					return {
						Wellcome,
						Registration,
						email: '',
						password: ''
					}
				},
				methods: {
					async onLogin () {
						AuthService.login({
							email: this.email,
							password: this.password
						})
							.then(data => {
								console.log('--- data', data);
							})
							.catch(err => {
								console.log('--- err', err);
							})

						// const response = await AuthService.login({
						// 	email: this.email,
						// 	password: this.password
						// });
					}
				}
    };
</script>

<style scoped lang="scss">
    // Start custom common variables
    @import '../app-variables';
    // End custom common variables

		// Custom styles
		.form__top {
			margin-bottom: -20;
		}

		.new-account {
			color: $black;
		}
</style>
