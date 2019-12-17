export default {
  data () {
    return {
      maxTracksScroll: 0,
      trackPage: 1
    }
  },
  methods: {
    onTracksScroll(args) {
      let elWidth = args.object.scrollableHeight;
      let scroll = args.scrollY
      this.tracksScroll = scroll
      if (scroll > this.maxTracksScroll + 10) {
        this.maxTracksScroll = elWidth;
        this.trackPage++;

        if (this.onNextPageTrack) {
          this.onNextPageTrack(this.trackPage);
        }
      }
    },
  }
}