<template>
    <Page class="page page--home c-black" actionBarHidden="true" backgroundSpanUnderStatusBar="true">
			<GridLayout columns="*" rows="*, auto" height="100%">
				<ScrollView class="panel panel--home" orientation="vertical" scrollBarIndicatorVisible="false">
					<GridLayout class="" columns="*" rows="250, *">
						
						<FlexboxLayout class="container container-fluid bg--top playlist__header" width="100%" row="0" :backgroundImage="playlist.img ? `https://chillax-server.herokuapp.com/static/tracks/${playlist.img}.jpg` : ''">
							<StackLayout class="row" height="100%">
								<FlexboxLayout flexDirection="column" alignItems="center" justifyContent="center"  height="100%">
									<!-- <Label class="fz-35" :text="playlist.name"/> -->
									<TextField class="field field--outline" v-model="playlist.name" hint="Input playlist name here" @focus="clearErrors('name')"/>
								</FlexboxLayout>
							</StackLayout>
						</FlexboxLayout>

						<FlexboxLayout v-if="!stage" class="container container-fluid" width="100%" row="1">
							<StackLayout class="row">

								<!-- <TextField class="field field--green" v-model="playlist.name" hint="Input playlist name here" @focus="clearErrors('name')"/>
								<Label class="error error--field" :text="errors.name" /> -->

								<Label class="fz-17" text="Select image"/>

								<HorizontalScroll @nextPage="loadTemplates">
									<FlexboxLayout
										v-for="(template, key) in templates"
										class="template__btn"
										:class="{ active: key == selectedTemplate }"
										:key="key"
										:backgroundImage="`https://chillax-server.herokuapp.com/static/tracks/${template.img}.jpg`"
										@tap="selectTemplate(key)"
									>
										<Label class="template__text" :text="key == selectedTemplate ? '✔️' : template.name"/>
									</FlexboxLayout>
								</HorizontalScroll>

								<Button v-if="playlist.name" class="btn green shadow" text="Done" @tap="postPlaylist"/>

							</StackLayout>
						</FlexboxLayout>

						<FlexboxLayout v-if="stage" class="container container-fluid" width="100%" row="1">
							<StackLayout class="row">
								<FlexboxLayout v-for="(track, key) in tracks" :key="track._id" class="track">
									<Label :text="'#' + key"></Label>
									<AbsoluteLayout class="track__button" :backgroundImage="track.img ? track.img : ''" @tap="uploadTrackFile(key)">
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

								<Button v-if="tracks.length > 1" class="btn green shadow" text="Done" @tap="goToPlaylist"/>
							</StackLayout>
						</FlexboxLayout>

					</GridLayout>
				</ScrollView>

				<NavBottom activeIndex="2" />
				
			</GridLayout>
    </Page>
</template>

<script>
	const mediaPicker = require('nativescript-mediafilepicker');
	import Home from '@/pages/Home';
	import Playlist from '@/pages/Playlist';
	import TrackService from '@/services/track';
	import PlaylistService from '@/services/playlist';
	import TemplateService from '@/services/template';
	import UploadService from '@/services/upload';
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

				if (this.templates && this.templates.length) {
					const template = this.templates[index];
					this.$set(this.playlist, 'img', template.img);
				}
			},
			async postPlaylist () {
				const playlist = await PlaylistService.postPlyalist({
					name: this.playlist.name,
					img: this.playlist.img
				})
				
				this.playlist = playlist.data.data;
				this.stage = 1;		
			},
			uploadTrackFile (index) {
				const track = this.tracks[index];

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

				const mediafilepicker = new mediaPicker.Mediafilepicker();
				mediafilepicker.openAudioPicker(options);

				mediafilepicker.on("getFiles", (res) => {
					let results = res.object.get('results');
					if (results[0]) {
						this.$set(track, 'img', `https://chillax-server.herokuapp.com/static/tracks/${this.playlist.img}.jpg`);
						this.$set(track, 'audio', results[0].file);
					}
				});
				
				mediafilepicker.on("error", (res) => {
					let msg = res.object.get('msg');
					console.log(msg);
				});
				
				mediafilepicker.on("cancel", (res) => {
					let msg = res.object.get('msg');
					console.log(msg);
				});
			},
			async addTrack (index) {
				try {
					const track = this.tracks[index];

					if (track.name && track.img) {

						const params = [
							{
								name: 'name',
								value: track.name
							},
							{
								name: 'playlistId',
								value: this.playlist._id
							},
							{
								name: 'audio',
								filename: track.audio
							}
						];

						const task = await UploadService.uploadFile(params);

						this.$set(track, 'stage', true);

						this.tracks.push({
							name: '',
							audio: '',
							img: '',
							stage: false
						})
					}
				} catch (err) {
					console.log('--- err upload',);
					console.dir(err);
				}
			},
			deleteTrack (index) {
				// it`s not work, and I dont know why
				//  [Vue warn]: Error in nextTick: "Error: Can't insert child, because the reference node has a different parent."
				// this.tracks.splice(index, 1);
			},
			goToPlaylist () {
				const id = this.playlist._id;
				this.$goToPage(Playlist, {
					id
				});
			},
			async loadTemplates (page = 1) {
				try {
					const templates = await TemplateService.getTemplates({
						page
					});
					
					if (templates.data)
						this.templates = this.templates.concat(templates.data.data);
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