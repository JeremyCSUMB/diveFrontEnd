<template>
  <div>
    <TravelMap class='travel-map'/>
    <Chart class='chart'/>
  </div>
</template>

<script>
import TravelMap from '@/components/TravelMap'
import Chart from '@/components/Chart.vue'

require('bootstrap')
export default {
  name: 'Dive Route',
  components: {
    TravelMap,
    Chart
  }
}
</script>

<style lang='scss' scoped>
.travel-map {
  height: 650px;
  width: 60%;
  float: left;
}
.chart {
  width: 35%;
  float: right;
}
</style>
