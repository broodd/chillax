<template>
    <Page class="page page--home c-white" actionBarHidden="true" backgroundSpanUnderStatusBar="true" androidStatusBarBackground="#51927B">
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
							<Button class="btn green" text="Sign in" @tap="$goToPage(Login)" />
							
							<Label class="mt-2 new-account" text="New Account?" @tap="$goToPage(Registration)" />
						</StackLayout>
					</FlexboxLayout>

				</GridLayout>
			</ScrollView>
    </Page>
</template>

<script>
		import Login from '@/pages/Login';
		import Registration from '@/pages/Registration';		

    export default {
			name: 'Wellcome',
			components: {
			},
			computed: {
			},
			data() {
				return {
					Login,
					Registration,
					Home
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
