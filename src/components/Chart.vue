<template>
  <div class="small">
    {{$route.params.rovName}}
    {{$route.params.diveNumber}}
    <line-chart :chart-data="datacollection"></line-chart>
    <button @click="fillData()">Randomize</button>
  </div>
</template>

<script>
import LineChart from '../constants/LineChart.js'
import axios from 'axios'

export default {
  components: {
    LineChart
  },
  data () {
    return {
      datacollection: null,
      lat: null,
      long: null
    }
  },
  mounted () {
    this.fillData()
    // this.renderChart(this.data, { legend: { display: false } })
  },
  created: function () {
    axios
      .get('http://localhost:8080/annotations/' + this.$route.params.rovName + '/' + this.$route.params.diveNumber)
      .then(res => {
        this.lat = res.data
      })
  },
  methods: {
    fillData () {
      this.datacollection = {
        labels: [1, 10, 100],
        datasets: [
          {
            label: 'Data',
            fill: 'false',
            backgroundColor: 'cornflowerblue',
            borderColor: 'cornflowerblue',
            data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()]
          }
        ]
      }
    },
    getRandomInt () {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    }
  }
}
</script>

<style>
  .small {
    max-width: 600px;
    margin:  50px auto;
  }
</style>
