<template>
    <Page class="page page--home c-black" actionBarHidden="true" backgroundSpanUnderStatusBar="true">
			<GridLayout columns="*" rows="*, auto" height="100%">
				<ScrollView class="panel panel--home" orientation="vertical" scrollBarIndicatorVisible="false">
					<GridLayout class="" columns="*" rows="250, *">
						
						<FlexboxLayout class="container container-fluid bg--top playlist__header" width="100%" row="0" :backgroundImage="image">
							<StackLayout class="row" height="100%">
								<FlexboxLayout flexDirection="column" alignItems="center" justifyContent="center"  height="100%">
									<Label class="fz-35" :text="playlist.name"/>
								</FlexboxLayout>
							</StackLayout>
						</FlexboxLayout>

						<FlexboxLayout v-if="!stage" class="container container-fluid" width="100%" row="1">
							<StackLayout class="row">

								<TextField class="field field--green" v-model="playlist.name" hint="Input playlist name" @focus="clearErrors('name')"/>
								<Label class="error error--field" :text="errors.name" />

								<Label class="fz-17" text="Select image"/>

								<HorizontalScroll @nextPage="loadTemplates">
									<FlexboxLayout
										v-for="(template, key) in templates"
										class="template__btn"
										:class="{ active: key == selectedTemplate }"
										:key="key"
										:backgroundImage="`http://192.168.0.104:3000/static/tracks/${template.img}.jpg`"
										@tap="selectTemplate(key)"
									>
										<Label class="template__text" :text="key == selectedTemplate ? '✔️' : template.name"/>
									</FlexboxLayout>
								</HorizontalScroll>

								<Button v-if="playlist.name" class="btn green shadow" text="Done" @tap="stage = !stage"/>

							</StackLayout>
						</FlexboxLayout>

						<FlexboxLayout v-if="stage" class="container container-fluid" width="100%" row="1">
							<StackLayout class="row">
								<FlexboxLayout v-for="(track, key) in tracks" :key="track._id" class="track">
									<Label :text="'#' + key"></Label>
									<AbsoluteLayout class="track__button" :backgroundImage="track.img" @tap="uploadTrackFile(key)">
										<Label class="track__button__circle" left="28" top="28"/>
									</AbsoluteLayout>
									<StackLayout class="track__text">
										<Label v-if="track.stage" class="track__name" :text="track.name" />
										<template v-else>
											<TextField class="input" v-model="track.name" hint="track name"/>
										</template>
									</StackLayout>
									<Button v-if="!track.stage && (track.name && track.img)" class="like my-fa add active" text.decode="&#xe805;" @tap="addTrack(key)"/>
									<!-- <Button v-if="track.stage" class="like my-fa add active" text.decode="&#xe801;" @tap="deleteTrack(key)"/> -->
								</FlexboxLayout>

								<Button v-if="tracks.length > 1" class="btn green shadow" text="Done" @tap="postPlaylist"/>
							</StackLayout>
						</FlexboxLayout>

					</GridLayout>
				</ScrollView>

				<NavBottom activeIndex="2" />
				
			</GridLayout>
    </Page>
</template>

<script>
		import axios from 'axios';
		const audio = require('nativescript-audio');
		const mPicker = require("nativescript-mediafilepicker");
		const fs = require("tns-core-modules/file-system");
		import Home from '@/pages/Home';
		import Author from '@/pages/Author';
		// import TrackScroll from '@/components/TrackScroll';
		import TrackService from '@/services/track';
		import PlaylistService from '@/services/playlist';
		import TemplateService from '@/services/template';
		import NavBottom from '@/components/NavBottom';

    export default {
			name: 'AddPlaylist',
			components: {
				NavBottom
			},
			computed: {
			},
			data() {
				return {
					errors: {
						name: '',
						img: ''
					},
					stage: 0,

					playlist: {
						name: '',
						img: '',
						author: {}
					},
					tracks: [
						{
							name: '',
							img: '',
							audio: '',
							stage: false
						}
					],

					image: '~/assets/img/playlists/focus_more_big_clip.png',
					selectedTemplate: 0,
					templates: []
				}
			},
			methods: {
				clearErrors (field) {
					if (field) {
						this.$set(this.errors, field, '');
					} else {
						this.errors = {
							email: '',
							password: ''
						};
					}
				},
				selectTemplate (index) {
					this.selectedTemplate = index;

					this.image = `http://192.168.0.104:3000/static/tracks/${this.templates[index].img}.jpg`;
				},
				uploadTrackFile (index) {
					const _self = this;
					const track = _self.tracks[index];

					let options = {
						android: {
							isCaptureMood: false, // if true then voice recorder will open directly.
							isNeedRecorder: true,
							maxNumberFiles: 1,
							isNeedFolderList: true,
							maxSize: 354000 // Maximum size of recorded file in bytes. 5900 = ~ 1 second
						},
						ios: {
							isCaptureMood: false, // if true then voice recorder will open directly.
							maxNumberFiles: 5,
							audioMaximumDuration: 10,
						}
					};

					const mediafilepicker = new mPicker.Mediafilepicker();
					mediafilepicker.openAudioPicker(options);
 
					mediafilepicker.on("getFiles", function (res) {
							let results = res.object.get('results');
							console.log('--- res[0]', results[0]);
							if (results[0]) {
								console.dir(results[0].file);
								_self.$set(track, 'img', _self.image);
								_self.$set(track, 'audio', results[0].file);
							}
					});
					
					mediafilepicker.on("error", function (res) {
							let msg = res.object.get('msg');
							console.log(msg);
					});
					
					mediafilepicker.on("cancel", function (res) {
							let msg = res.object.get('msg');
							console.log(msg);
					});
				},
				addTrack (index) {
					try {
						const track = this.tracks[index];

						var bodyFormData = new FormData();
						bodyFormData.append('name', 'name 123');
						bodyFormData.append('playlistId', '5ddeb28b7ed4b206b8f72e0a');
						const imageFile = fs.File.fromPath(track.audio);
						const binarySource = imageFile.readSync(err => { console.log("Error:" + err); });
						console.log('--- binarySource', binarySource);
						bodyFormData.append('audio', binarySource);

						const request = {
							method: 'put',
							url: 'http://192.168.0.104:3000/audio-file',
							data: bodyFormData,
							headers: {
								Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZGRlYjExNjAyMzIyNjE3NjgwOTRkOTgiLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiaWF0IjoxNTc1MTE5ODY1LCJleHAiOjE1NzU3MjQ2NjV9.Qv8b-N4ppugW-Zl_Cjk9UcsX6r4b3LCA1vbFDNpVJdI',
								'Content-Type': 'multipart/form-data'
								// "Content-Type": "application/octet-stream"
							}
						}
						console.log('--- request', request);
						axios(request)
						.then(function (response) {
								//handle success
								console.log('okey', response);
						})
						.catch(function (response) {
								//handle error
								console.log('bad', response);
						});

						if (track.name && track.img) {
							this.$set(track, 'stage', true);

							this.tracks.push({
								name: '',
								audio: '',
								img: '',
								stage: false
							})
						}
					} catch (err) {
						console.log('--- err', err);
					}

					

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
				},
				deleteTrack (index) {
					// it`s not work, and I dont know why
					//  [Vue warn]: Error in nextTick: "Error: Can't insert child, because the reference node has a different parent."
					// this.tracks.splice(index, 1);
				},
				async postPlaylist () {
					
				},
				async loadTemplates (page = 1) {
					try {
						const templates = await TemplateService.getTemplates({
							page
						});
						
						this.templates = templates.data.data;
					} catch (err) {
						console.log('--- err', err);
					}
				}
			},
			async created () {
				// fetch templates
				await this.loadTemplates();
				this.selectTemplate(0);
			}
    };
</script>

<style scoped lang="scss">
    // Start custom common variables
    @import '../app-variables';
		// End custom common variables
		
		.btn {
			width: 200;
		}

		.field {
			text-align: center;
			// width: auto;
			// background: linear-gradient(to right top,#4cc196,#44bc9a,#3eb79d,#3bb29f,#3aada1);
			// background-color: #51927B;
		}
</style>