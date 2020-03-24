<template>
  <div>
    <CheckDive/>
    <VideoView/>
    <button v-on:click="goBack()">Go Back</button>
  </div>
</template>

<script>

import VideoView from '@/components/VideoView.vue'
export default {
  name: 'Video',
  components: {
    VideoView
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}

</script>
