export default {
  methods: {
    $goToPage (Page, props) {
      this.$navigateTo(Page, {
        props,
        animated: true,
        transition: {
          name: "fade",
          duration: 250,
          curve: "easeIn"
        }
      });
    }
  }
}