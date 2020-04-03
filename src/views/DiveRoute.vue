<template>
  <div>
    <DataError/>
    <TravelMap class='travel-map'/>
    <button v-on:click="submitData()">View video</button>
    <br>
    <AncillaryChart class='AncillaryChart'/>
    <AnnotationChart class='AnnotationChart'/>
    <Chart class='Chart'/>
  </div>
</template>

<script>
import TravelMap from '@/components/TravelMap'
import Chart from '@/components/Chart.vue'
import AncillaryChart from '@/components/AncillaryChart.vue'
import AnnotationChart from '@/components/AnnotationChart.vue'
import DataError from '@/components/DataError.vue'
require('bootstrap')
export default {
  name: 'DiveRoute',
  components: {
    TravelMap,
    Chart,
    AncillaryChart,
    AnnotationChart,
    DataError
  },
  methods: {
    submitData () {
      this.$router.push('/video/' + this.$route.params.rovName + '/' + this.$route.params.diveNumber)
    }
  }
}
</script>

<style lang='scss' scoped>
.travel-map {
  height: 650px;
  width: 100%;
  float: left;
}
</style>
