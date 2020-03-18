<template>
  <div>
    <CheckDive/>
    <VideoView/>
    <AncillaryChart class='chart'/>
  </div>
</template>

<script>

import VideoView from '@/components/VideoView.vue'
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
