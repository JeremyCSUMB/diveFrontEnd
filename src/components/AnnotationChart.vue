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
              id: 'xAxis1'
            },
            {
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
      .get('http://localhost:8080/annotations/' + this.$route.params.rovName + '/' + this.$route.params.diveNumber)
      .then(response => {
        var res = JSON.parse(JSON.stringify(response.data))
        for (var i in res) {
          if (res[i].annotations != null) {
            for (var j = 0; j < res[i].annotations.length; j += 2) {
              if (res[i].annotations[j].ancillary_data != null) {
                var salinity = res[i].annotations[j].ancillary_data.salinity
                var pressure = res[i].annotations[j].ancillary_data.pressure_dbar
                var temperature = res[i].annotations[j].ancillary_data.temperature_celsius
                this.chartData.labels.push(pressure)
                this.chartData.datasets[0].data.push(parseFloat(salinity))
                this.chartData.datasets[1].data.push(parseFloat(temperature))
              }
              // console.log(res[i].annotations[j].ancillary_data == null)
            }
          }
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
