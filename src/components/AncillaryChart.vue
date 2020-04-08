<template>
  <div class="small">
    Pressure - CTD data
    <div class='gradient'>.</div>
    <pre class="tab">0     400     800     1200     1600    2000     2400     2800     3200     3600     4000</pre>
    <br>
    {{date}}
    <ScatterPlot v-if="loaded" :chartData="chartData" :options="options"></ScatterPlot>
  </div>
</template>

<script>
import ScatterPlot from '../constants/ScatterPlot.js'
import axios from 'axios'

export default {
  components: {
    ScatterPlot
  },
  data () {
    return {
      date: null,
      loaded: false,
      chartdata: null,
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Salinity'
            }
          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Temperature'
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
      .get('http://localhost:8080/dive/getctd/' + this.$route.params.rovName + '/' + this.$route.params.diveNumber)
      .then((response) => {
        var res = JSON.parse(JSON.stringify(response.data))
        var pointNum = 0
        for (var i = 0; i < res.length; i += 6) {
          if (res[i].salinity <= 0) {
            continue
          }

          var salinity = res[i].salinity
          var pressure = res[i].pressure
          var temperature = res[i].temperature
          var background = ''
          var border = ''

          this.chartData.labels.push(parseFloat(temperature))
          this.chartData.datasets[0].data.push({ x: parseFloat(salinity), y: temperature })

          if (pressure < 400) {
            background = 'white'
            border = 'black'
          } else if (pressure < 800) {
            background = '#f600ff'
            border = '#f600ff'
          } else if (pressure < 1200) {
            background = 'purple'
            border = 'purple'
          } else if (pressure < 1600) {
            background = 'blue'
            border = 'blue'
          } else if (pressure < 2000) {
            background = 'cyan'
            border = 'cyan'
          } else if (pressure < 2400) {
            background = '#00f913'
            border = '#00f913'
          } else if (pressure < 2800) {
            background = 'lightgreen'
            border = 'lightgreen'
          } else if (pressure < 3200) {
            background = 'yellow'
            border = 'yellow'
          } else if (pressure < 3600) {
            background = 'orange'
            border = 'orange'
          } else if (pressure < 4000) {
            background = 'red'
            border = 'red'
          } else {
            background = 'black'
            border = 'black'
            console.log(pressure)
          }
          this.chartData.datasets[0].pointBackgroundColor[pointNum] = background
          this.chartData.datasets[0].pointBorderColor[pointNum] = border
          pointNum++
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
            label: '',
            pointBackgroundColor: [],
            pointBorderColor: [],
            fill: 'false',
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
  .gradient {
    color: rgba(0,249,19,1);
    background: linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(246,0,255,1) 10%, rgba(147,0,255,1) 20%, rgba(0,3,255,1) 30%, rgba(0,226,255,1) 40%, rgba(0,255,117,1) 50%, rgba(0,249,19,1) 60%, rgba(239,255,0,1) 70%, rgba(255,164,0,1) 80%, rgba(255,0,0,1) 90%, rgba(0,0,0,1) 100%);
  }
</style>
