<template>
    <Page class="page page--home bg bg--main c-white" actionBarHidden="true" backgroundSpanUnderStatusBar="ture">
				<ScrollView class="home-panel" orientation="vertical">
            <StackLayout height="100%">
							<FlexboxLayout
								class="container"
							>
								<StackLayout class="row text-center">
									<FlexboxLayout class="mb-2" justifyContent="center">
										<Image src="~/assets/img/logo.png"/>
									</FlexboxLayout>

									<Button class="btn" text="Sign in" @tap="$navigateTo(Login)" />
									<Button class="btn green" text="Sign in with google" @tap="$navigateTo(Login)" />
									<Button class="btn blue" text="Sign in with facebook" @tap="$navigateTo(Login)" />
									
									<Label class="mt-2" text="New Account?" @tap="$navigateTo(Login)" />
								</StackLayout>
							</FlexboxLayout>
							<!-- <GridLayout>
									<Label class="info" horizontalAlignment="center" verticalAlignment="center">
											<FormattedString>
													<Span class="fa" text.decode="&#xf135; "/>
													<Span :text="message"/>
											</FormattedString>
									</Label>
							</GridLayout> -->
            </StackLayout>
				</ScrollView>
    </Page>
</template>

<script>
		import Login from '@/components/Login'

    export default {
        computed: {
				},
				data() {
					return {
						Login
					}
				}
    };
</script>

<style scoped lang="scss">
    // Start custom common variables
    @import '../app-variables';
    // End custom common variables

		// Custom styles
		// Image {
		// 	width: 80%;
		// }
		.home-panel {
			padding-bottom: 40;
		}
</style>
