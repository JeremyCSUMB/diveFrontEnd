<template>
  <div>
    <TravelMap class='travel-map'/>
    <Chart class='chart'/>
    <button v-on:click="submitData()">Submit</button>
  </div>
</template>

<script>
import TravelMap from '@/components/TravelMap'
import Chart from '@/components/Chart.vue'

require('bootstrap')
export default {
  name: 'DiveRoute',
  components: {
    TravelMap,
    Chart
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
  width: 60%;
  float: left;
}
.chart {
  width: 35%;
  float: right;
}
</style>
