<template>
	<ScrollView class="playlist-list" orientation="horizontal" scrollBarIndicatorVisible="false" @scroll="onHorizontaltScroll">
		<StackLayout orientation="horizontal">
			<slot></slot>
		</StackLayout>
	</ScrollView>
</template>

<script>
	export default {
		data () {
			return {
				maxScroll: 0,
				page: 1,
			}
		},
		methods: {
			onHorizontaltScroll (args) {
				let elWidth = args.object.scrollableWidth;
				let scroll = args.scrollX;
				if (scroll > this.maxScroll + 10) {
					this.maxScroll = elWidth;
					this.page++;
					
					this.$emit('nextPage', this.page)
				}
			},
		}
	}
</script>