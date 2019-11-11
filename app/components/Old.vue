<template>
    <Page class="page page--login c-black bg bg--cream bg--main" actionBarHidden="true">
			<ScrollView class="panel panel--login" orientation="vertical">
				<FlexboxLayout height="100%" justifyContent="flex-end" alignItems="center" flexDirection="column">
					<FlexboxLayout class="container">
						<StackLayout class="row text-center">
							<FlexboxLayout class="mb-2" justifyContent="center">
								<Image src="~/assets/img/logo.png"/>
							</FlexboxLayout>
						</StackLayout>
					</FlexboxLayout>
					<FlexboxLayout class="container pb-4">
						<StackLayout class="row text-center">
							
							<Button class="close my-fa" text.decode="&#xe801;" />
							<!-- <Label class="close mb-5 my-fa" text.decode="&#xe801;" horizontalAlignment="center" verticalAlignment="center"/> -->

							<TextField class="field" v-model="email" hint="EMAIL" />
							<TextField class="field" v-model="email" hint="PASSWORD" />
							<Button class="btn shadow" text="Sign in" @tap="$navigateTo(Home)" />
							
							<Label class="mt-2" text="New Account?" @tap="$navigateTo(Home)" />
						</StackLayout>
					</FlexboxLayout>
				</FlexboxLayout>
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
		.close {
			width: 50;
			height: 50;
			background-color: $white;
			border-radius: 50%;
			padding-top: 11;
			font-size: 35;
			color: $black;
		}
</style>
