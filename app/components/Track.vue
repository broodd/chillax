<template>
	<FlexboxLayout class="track">
		<AbsoluteLayout class="track__button" @tap="state = !state">
			<Button class="track__button__circle" left="28" top="28" :class="{ active: state }"/>
		</AbsoluteLayout>
		<StackLayout class="track__text">
			<Label class="track__name" :text="track.name" />
			<Label class="track__author" :text="'petro' + !!track.author._id" @tap="goToAuthor(track.author._id)"/>
		</StackLayout>
		<Button class="like my-fa" text.decode="&#xe802;" :class="{ active: track.liked }" @tap="$emit('likeTrack', track._id, index)"/>
	</FlexboxLayout>
</template>

<script>
	export default {
		name: 'Track',
		props: {
			track: Object,
			index: Number
		},
		data () {
			return {
				state: false
			}
		},
		methods: {
		}
	}
</script>