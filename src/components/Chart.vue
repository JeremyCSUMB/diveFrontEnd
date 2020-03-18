<template>
  <div class="small">
    {{$route.params.rovName}}
    {{$route.params.diveNumber}}
    <br>
    {{date}}
    <line-chart v-if="loaded" :chartData="chartData" :options="options"></line-chart>
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
      date: null,
      loaded: false,
      chartdata: null,
      options: {
        scales: {
          yAxes: [{
            ticks: {
              reverse: true
            },
            scaleLabel: {
              display: true,
              labelString: 'Depth'
            }
          }],
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Time (UTC)'
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
      axios.get('http://localhost:8080/dive/getHourAndDepth/' + this.$route.params.rovName + '/' + this.$route.params.diveNumber),
      axios.get('http://localhost:8080/dive/getMinAndDepth/' + this.$route.params.rovName + '/' + this.$route.params.diveNumber),
      axios.get('http://localhost:8080/dive/getDiveDates/' + this.$route.params.rovName + '/' + this.$route.params.diveNumber)
    ])
      .then(axios.spread((hourResponse, minResponse, dateResponse) => {
        var hourRes = JSON.parse(JSON.stringify(hourResponse.data))
        var minRes = JSON.parse(JSON.stringify(minResponse.data))
        var dateRes = JSON.parse(JSON.stringify(dateResponse.data))
        this.date = dateRes.startDate
        if (dateRes.startDate !== dateRes.endDate) {
          this.date += ' - ' + dateRes.endDate
        }
        for (var i = 0; i < hourRes.length; i += 35) {
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
    }
  }
}
</script>

<style>
  .small {
    max-width: 600px;
  }
</style>
