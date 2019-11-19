<template>
	<StackLayout orientation="vertical">
		<FlexboxLayout v-for="track in tracks" :key="track._id" class="track" width="100%">
			<AbsoluteLayout class="track__button">
				<Button class="track__button__circle" left="28" top="28"/>
			</AbsoluteLayout>
			<StackLayout class="track__text">
				<Label class="track__name" :text="track.name" />
			</StackLayout>
			<Button class="like my-fa" text.decode="&#xe802;" :class="{active: track.liked}"/>
		</FlexboxLayout>
	</StackLayout>
</template>

<script>
	export default {
		props: {
			tracks: Array
		},
		data() {
			return {
			}
		},
		methods: {
		}
	}
</script>