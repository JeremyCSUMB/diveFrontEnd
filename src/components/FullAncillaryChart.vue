<template>
  <div class="small">
    Click a color box to hide that line from the chart
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
          xAxes: [
            {
              ticks: {
                callback: function (data) {
                  var salinity = data.split(';')[0]
                  return salinity
                }
              },
              id: 'xAxis1'
            },
            {
              ticks: {
                callback: function (data) {
                  var temperature = data.split(';')[1]
                  return temperature
                }
              },
              gridLines: {
                drawOnChartArea: false // only want the grid lines for one axis to show up
              },
              id: 'xAxis2'
            }
          ],
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Pressure'
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
    axios
      .get('http://localhost:8080/dive/getCTD/' + this.$route.params.rovName + '/' + this.$route.params.diveNumber)
      .then((response) => {
        var res = JSON.parse(JSON.stringify(response.data))
        for (var i = 0; i < res.length; i += 75) {
          var salinity = parseFloat(res[i].salinity).toString()
          var pressure = parseFloat(res[i].pressure).toString()
          var temperature = parseFloat(res[i].temperature).toString()
          this.chartData.labels.push(pressure)
          this.chartData.datasets[0].data.push(parseFloat(salinity))
          this.chartData.datasets[1].data.push(parseFloat(temperature))
        }
        this.loaded = true
      })
  },
  methods: {
    fillData () {
      this.chartData = {
        labels: [],
        datasets: [
          {
            label: 'Salinity',
            fill: 'false',
            backgroundColor: 'cornflowerblue',
            borderColor: 'cornflowerblue',
            data: [],
            xAxisID: 'xAxis1'
          },
          {
            label: 'Temperature',
            fill: 'false',
            backgroundColor: '#29d68e',
            borderColor: '#29d68e',
            data: [],
            xAxisID: 'xAxis2'
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
