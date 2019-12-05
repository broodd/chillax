<template>
	<FlexboxLayout class="track" :class="{ active: stage }">
		<AbsoluteLayout class="track__button" @tap="playTrack" :backgroundImage="`http://192.168.0.104:3000/static/tracks/${track.img}.jpg`">
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
			},
			playTrack () {
				this.stage = !this.stage;

				// const player = new audio.TNSPlayer();
				// const playerOptions = {
				// 	audioFile: '/storage/emulated/0/zedge/ringtone/Rock_Guitar_2-bfe6b0fa-539d-367d-8cce-18b3b0d9071b.mp3',
				// 	loop: false,
				// 	completeCallback: function() {
				// 		console.log('finished playing');
				// 	},
				// 	errorCallback: function(errorObject) {
				// 		console.log(JSON.stringify(errorObject));
				// 	},
				// 	infoCallback: function(args) {
				// 		console.log(JSON.stringify(args));
				// 	}
				// };

				// player
				// 	.playFromFile(playerOptions)
				// 	.then(function(res) {
				// 		console.log(res);
				// 	})
				// 	.catch(function(err) {
				// 		console.log('something went wrong...', err);
				// 	});
			}
		}
	}
</script>