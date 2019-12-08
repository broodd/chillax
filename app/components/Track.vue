<template>
	<FlexboxLayout class="track" :class="{ active: stage, paused: !paused }">
		<AbsoluteLayout class="track__button" @tap="$emit('playTrack', index)" :backgroundImage="`http://192.168.0.104:3000/static/tracks/${track.img}.jpg`">
			<Label class="track__button__circle"/>
		</AbsoluteLayout>
		<StackLayout class="track__text">
			<Label class="track__name" :text="track.name" />
			<Label class="track__author" :text="'petro' + !!track.author._id" @tap="goToAuthor()"/>
		</StackLayout>
		<Button class="like my-fa" text.decode="&#xe802;" :class="{ active: track.liked }" @tap="$emit('likeTrack', track._id, index)"/>
	</FlexboxLayout>
</template>

<script>
	import Author from '@/pages/Author';
	const audioPlayer = require('nativescript-audio');
	const player = new audioPlayer.TNSPlayer();

	export default {
		name: 'Track',
		props: {
			track: Object,
			index: Number,
			stage: Boolean,
			paused: Boolean
		},
		methods: {
			goToAuthor () {
				this.$navigateTo(Author, {
					props: {
						id: this.track.author._id
					}
				})
			}
		}
	}
</script>