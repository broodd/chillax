<template>
  <ScrollView class="panel" orientation="vertical" scrollBarIndicatorVisible="false" @scroll="onTracksScroll">
    <slot></slot>
  </ScrollView>
</template>

<script>
  export default {
  data () {
    return {
      maxScroll: 0,
      page: 1
    }
  },
  methods: {
    onTracksScroll(args) {
      let elWidth = args.object.scrollableHeight;
      let scroll = args.scrollY
      this.tracksScroll = scroll
      if (scroll > this.maxScroll + 10) {
        this.maxScroll = elWidth;
        this.page++;

        this.$emit('nextPage', this.page)
      }
    },
  }
}
</script>