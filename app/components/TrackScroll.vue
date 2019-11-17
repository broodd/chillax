<template>
	<StackLayout orientation="vertical">
		<FlexboxLayout v-for="(track, key) in tracks" :key="key" class="track" width="100%">
			<!-- <Button class="track__button"/> -->
			<AbsoluteLayout class="track__button">
				<!-- <Button class="track__button__circle my-fa" text.decode="&#xe801;" /> -->
				<Button class="track__button__circle" left="28" top="28"/>
				<!-- <Label left="30" top="40" width="100" height="100" backgroundColor="#43b883"/> -->
			</AbsoluteLayout>
			<StackLayout class="track__text">
				<Label class="track__name" :text="'Focus ' + key" />
				<Label class="track__author" text="some petro" />
			</StackLayout>
			<Button class="like my-fa" text.decode="&#xe802;" :class="{active: key % 2 == 0}"/>
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