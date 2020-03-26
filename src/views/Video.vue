<template>
  <div>
    <VideoView/>
    <AnnotationChart class='chart'/>
  </div>
</template>

<script>
import VideoView from '@/components/VideoView.vue'
import AnnotationChart from '@/components/AnnotationChart.vue'

export default {
  name: 'Video',
  components: {
    VideoView,
    AnnotationChart
  }
}

</script>
