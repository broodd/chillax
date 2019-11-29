<template>
	<FlexboxLayout class="track" :class="{ active: stage }">
		<AbsoluteLayout class="track__button" @tap="stage = !stage" :backgroundImage="`http://192.168.0.101:3000/static/tracks/${track.img}.jpg`">
			<Label class="track__button__circle" left="28" top="28"/>
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

	export default {
		name: 'Track',
		props: {
			track: Object,
			index: Number
		},
		data () {
			return {
				stage: false
			}
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