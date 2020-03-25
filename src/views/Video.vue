<template>
  <div>
    <CheckDive/>
    <VideoView/>
    <AnnotationChart class='chart'/>
  </div>
</template>

<script>

import VideoView from '@/components/VideoView.vue'
import CheckDive from '@/components/CheckDive.vue'
import AnnotationChart from '@/components/AnnotationChart.vue'

export default {
  name: 'Video',
  components: {
    VideoView,
    CheckDive,
    AnnotationChart
  }
}

</script>
