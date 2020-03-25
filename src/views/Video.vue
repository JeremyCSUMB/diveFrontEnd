<template>
  <div>
    <CheckDive/>
    <VideoView/>
    <button v-on:click="goBack()">Go Back</button>
    <AncillaryChart class='chart'/>
  </div>
</template>

<script>

import VideoView from '@/components/VideoView.vue'
import AncillaryChart from '@/components/AncillaryChart.vue'
export default {
  name: 'Video',
  components: {
    VideoView,
    AncillaryChart
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}

</script>
