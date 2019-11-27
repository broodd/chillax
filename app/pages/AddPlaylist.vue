<template>
    <Page class="page page--home c-black" actionBarHidden="true" backgroundSpanUnderStatusBar="true">
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

							<TextField class="field field--green" v-model="playlist.name" hint="input playlist name" @focus="clearErrors('name')"/>
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
							<FlexboxLayout v-for="(track, key) in tracks" :key="key" class="track">
								<AbsoluteLayout class="track__button" :backgroundImage="track.img" @tap="uploadTrackFile(key)">
									<Label class="track__button__circle" left="28" top="28"/>
								</AbsoluteLayout>
								<StackLayout class="track__text">
									<Label v-if="track.stage" class="track__name" :text="track.name" />
									<template v-else>
										<TextField class="input" v-model="track.name" hint="track name"/>
									</template>
								</StackLayout>
								<Button v-if="!track.stage && (track.name && track.img)" class="like my-fa add active" text.decode="&#xe805;" @tap="addTrack(track)"/>
								<Button v-if="track.stage" class="like my-fa add active" text.decode="&#xe801;" @tap="deleteTrack(key)"/>
							</FlexboxLayout>

							<Button v-if="tracks.length > 1" class="btn green shadow" text="Done" @tap="postPlaylist"/>
						</StackLayout>
					</FlexboxLayout>

				</GridLayout>
			</ScrollView>
    </Page>
</template>

<script>
		import Home from '@/pages/Home';
		import Author from '@/pages/Author';
		// import TrackScroll from '@/components/TrackScroll';
		import TrackService from '@/services/track';
		import PlaylistService from '@/services/playlist';
		import TemplateService from '@/services/template';

    export default {
			name: 'AddPlaylist',
			components: {
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
							stage: false,
							errors: {
								name: true,
								img: false
							}
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
					const track = this.tracks[index];

					this.$set(track, 'img', this.image);
				},
				addTrack (track) {
					if (track.name && track.img) {
						this.$set(track, 'stage', true);

						this.tracks.push({
							name: '',
							img: '',
							stage: false
						})
					}
				},
				deleteTrack (index) {
					this.tracks.splice(index, 1);
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