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
							<!-- <TrackScroll :tracks="tracks"/> -->

							<TextField class="field field--green" v-model="playlist.name" hint="input playlist name" @focus="clearErrors('name')"/>
							<Label class="error error--field" :text="errors.name" />

							<Label class="fz-17" text="Select image"/>

							<HorizontalScroll>
								<FlexboxLayout
									v-for="(template, key) in templates"
									class="template__btn"
									:class="{ active: key == selectedTemplate }"
									:key="key"
									:backgroundImage="`http://192.168.0.103:3000/static-tracks/${template.img}`"
									@tap="selectTemplate(key)"
								>
									<Label class="template__text" :text="key == selectedTemplate ? '✔️' : template.name"/>
								</FlexboxLayout>
							</HorizontalScroll>

							<Button class="btn green shadow" text="Done" @tap="stage = !stage"/>

						</StackLayout>
					</FlexboxLayout>

					<FlexboxLayout v-if="stage" class="container container-fluid" width="100%" row="1">
						<StackLayout class="row">
							<FlexboxLayout v-for="(track, key) in tracks" :key="key" class="track">
								<AbsoluteLayout class="track__button" :backgroundImage="track.stage ? image : ''">
									<Label class="track__button__circle" left="28" top="28"/>
								</AbsoluteLayout>
								<StackLayout class="track__text">
									<Label v-if="track.stage" class="track__name" :text="track.name" />
									<TextField v-else class="input" v-model="track.name" hint="track name"/>
								</StackLayout>
								<Button v-if="!track.stage" class="like my-fa add active" text.decode="&#xe805;" @tap="track.stage = !track.stage"/>
							</FlexboxLayout>
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
							stage: false
						}
					],

					image: '~/assets/img/playlists/focus_more_big_clip.png',
					selectedTemplate: 0,
					templates: [
						{
							name: 'blue',
							img: 'blue.jpg'
						},
						{
							name: 'green',
							img: 'green.jpg'
						},
						{
							name: 'pink',
							img: 'pink.jpg'
						}
					]
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

					this.image = `http://192.168.0.103:3000/static-tracks/${this.templates[index].img}`;
				},
				async loadTemplates (page = 1) {
					try {
						const templates = await TemplateService.getTemplates({
							page
						});
						
						this.templates = templates;
					} catch (err) {
						console.log('--- err', err);
					}
				}
			},
			async created () {
				// fetch templates
				await this.
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
