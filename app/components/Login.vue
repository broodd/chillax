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
							<Button class="close my-fa" text.decode="&#xe801;" @tap="$navigateTo(Home)" />

							<TextField class="field" v-model="email" hint="EMAIL" />
							<TextField class="field" v-model="email" hint="PASSWORD" />

							<Button class="btn shadow" text="Sign in" @tap="$navigateTo(Home)" />
							
							<Label class="mt-2 new-account" text="New Account?" @tap="$navigateTo(Home)" />
						</StackLayout>
					</FlexboxLayout>
					
				</GridLayout>
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
		.form__top {
			margin-bottom: -20;
		}

		.new-account {
			color: $black;
		}
</style>
