<template>
  <div>
    <CheckDive/>
    <VideoView/>
    <AnnotationChart class='chart'/>
    <button v-on:click="goBack()">Go Back</button>
    <AncillaryChart class='chart'/>
  </div>
</template>

<script>

import VideoView from '@/components/VideoView.vue'
import AnnotationChart from '@/components/AnnotationChart.vue'
// import CheckDive from '@/components/CheckDive.vue'

import AncillaryChart from '@/components/AncillaryChart.vue'
export default {
  name: 'Video',
  components: {
    VideoView,
    // CheckDive,
    AnnotationChart,
    AncillaryChart
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}

</script>
