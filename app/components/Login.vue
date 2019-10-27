<template>
    <Page class="page page--home bg bg--main c-white" actionBarHidden="true">
			<ScrollView class="home-panel" orientation="vertical">
				<StackLayout height="100%">
					<FlexboxLayout
						class="container"
					>
						<StackLayout class="row text-center">
							<FlexboxLayout class="mb-2" justifyContent="center">
								<Image src="~/assets/img/logo.png"/>
							</FlexboxLayout>

							<TextField v-model="email" hint="Email" />
							<Button class="btn green" text="Sign in with google" @tap="$navigateTo(Home)" />
							<Button class="btn blue" text="Sign in with facebook" @tap="$navigateTo(Home)" />
							
							<Label class="mt-2" text="New Account?" @tap="$navigateTo(Home)" />
						</StackLayout>
					</FlexboxLayout>
				</StackLayout>
			</ScrollView>
    </Page>
</template>

<script>
		import Home from '@/components/Home'

    export default {
        computed: {
				},
				data() {
					return {
						Home,
						email: ''
					}
				}
    };
</script>

<style scoped lang="scss">
    // Start custom common variables
    @import '../app-variables';
    // End custom common variables

    // Custom styles
    .fa {
        color: $accent-dark;
    }

    .info {
        font-size: 20;
    }
</style>
