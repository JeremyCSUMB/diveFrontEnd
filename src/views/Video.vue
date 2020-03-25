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
export default {
  name: 'Video',
  components: {
    VideoView
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    }
import CheckDive from '@/components/CheckDive.vue'
import AncillaryChart from '@/components/AncillaryChart.vue'

export default {
  name: 'Video',
  components: {
    VideoView,
    CheckDive,
    AncillaryChart
  }
}

</script>
