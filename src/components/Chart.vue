<template>
  <div class="small">
    {{$route.params.rovName}}
    {{$route.params.diveNumber}}
    <line-chart v-if="loaded" :chartData="chartData" :options="options"></line-chart>
    <!-- <button @click="fillData()">Randomize</button> -->
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
      loaded: false,
      chartdata: null,
      options: {
        scales: {
          yAxes: [{
            ticks: {
              reverse: true
            }
          }]
        }
      }
    }
  },
  async mounted () {
    this.fillData()
  },
  created: function () {
    axios.all([
      axios.get('http://localhost:8080/dive/gethouranddepth/' + this.$route.params.rovName + '/' + this.$route.params.diveNumber),
      axios.get('http://localhost:8080/dive/getminanddepth/' + this.$route.params.rovName + '/' + this.$route.params.diveNumber)
    ])
      .then(axios.spread((hourResponse, minResponse) => {
        var hourRes = JSON.parse(JSON.stringify(hourResponse.data))
        var minRes = JSON.parse(JSON.stringify(minResponse.data))
        for (var i = 0; i < hourRes.length; i += 100) {
          var hour = parseInt(hourRes[i].hour).toString()
          var minute = parseInt(minRes[i].minute).toString()
          this.chartData.labels.push(hour.concat(':' + minute.padStart(2, '0')))
          this.chartData.datasets[0].data.push(parseFloat(hourRes[i].depth))
        }
        this.loaded = true
      }))
  },
  methods: {
    fillData () {
      this.chartData = {
        labels: [],
        datasets: [
          {
            label: 'Data',
            fill: 'false',
            backgroundColor: 'cornflowerblue',
            borderColor: 'cornflowerblue',
            data: []
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
  }
</style>
