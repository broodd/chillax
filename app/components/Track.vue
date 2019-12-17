<template>
  <FlexboxLayout class="track" :class="{ active: stage, paused: !paused }">
    <AbsoluteLayout class="track__button" @tap="$emit('playTrack', index)" :backgroundImage="`https://chillax-server.herokuapp.com/static/tracks/${track.img}.jpg`">
      <Label v-if="!stage" class="track__button__circle"/>
      <Label v-if="stage && !paused" class="icon play my-fa" text.decode="&#xe80a;"></Label>
      <Label v-if="stage && paused" class="icon pause my-fa" text.decode="&#xe80b;"></Label>
    </AbsoluteLayout>
    <StackLayout class="track__text" @tap="$emit('playTrack', index)">
      <Label class="track__name" :text="track.name" />
      <Label class="track__author" :text="track.author.profile.name"/>
    </StackLayout>
    <Button class="like my-fa" text.decode="&#xe802;" :class="{ active: track.liked }" @tap="$emit('likeTrack', track._id, index)"/>
  </FlexboxLayout>
</template>

<script>
  const audioPlayer = require('nativescript-audio');
  const player = new audioPlayer.TNSPlayer();

  export default {
    name: 'Track',
    props: {
      track: Object,
      index: Number,
      stage: Boolean,
      paused: Boolean
    }
  }
</script>