<template>
	<FlexboxLayout class="track" :class="{ active: stage }">
		<AbsoluteLayout class="track__button" @tap="playTrack" :backgroundImage="`http://192.168.100.37:3000/static/tracks/${track.img}.jpg`">
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
	const audioPlayer = require('nativescript-audio');
	const player = new audioPlayer.TNSPlayer();

	export default {
		name: 'Track',
		props: {
			track: Object,
			index: Number
		},
		data () {
			return {
				stage: false,
				countPlaying: 0
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
				try {
					if (this.stage == true) {
						player.pause();
						this.stage = false;
					} else {
						if (this.countPlaying > 1) {
							player.resume();
							this.stage = true;
						} else {
							const playerOptions = {
								audioFile: `http://192.168.100.37:3000/static/audio${this.track.src}`,
								loop: false,
								completeCallback: () => {
									console.log('finished playing');
									this.countPlaying = 0
								},
								errorCallback: (errorObject) => {
									console.log(JSON.stringify(errorObject));
								},
								infoCallback: (args) => {
									console.log(JSON.stringify(args));
								}
							};

							player
								.playFromFile(playerOptions)
								.then(() => {
									this.stage = true;
								})
						}
						
						this.counter++;
					}
				} catch (err) {
					console.log('something went wrong...', err);
					
					this.stage = false;
				}
			}
		}
	}
</script>