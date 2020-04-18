<template>
    <ScatterPlot v-if="loaded" :chartData="chartData" :options="options"></ScatterPlot>
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
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: true
        },
        scales: {
          xAxes: [{
            id: '1',
            scaleLabel: {
              display: true,
              labelString: 'Data'
            }
          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Depth'
            },
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
    axios
      .get('http://localhost:8080/dive/getctd/' + this.$route.params.rovName + '/' + this.$route.params.diveNumber)
      .then((response) => {
        var res = JSON.parse(JSON.stringify(response.data))
        for (var i = 0; i < res.length; i += 15) {
          if (res[i].salinity <= 0) {
            continue
          }
          var salinity = res[i].salinity
          var pressure = res[i].pressure

          this.chartData.labels.push(parseFloat(pressure))
          this.chartData.datasets[0].data.push({ x: parseFloat(salinity), y: pressure })
        }
        for (i = 0; i < res.length; i += 15) {
          if (res[i].salinity <= 0) {
            continue
          }
          pressure = res[i].pressure
          var temperature = res[i].temperature

          this.chartData.labels.push(parseFloat(pressure))
          this.chartData.datasets[1].data.push({ x: parseFloat(temperature), y: pressure })
        }
        for (i = 0; i < res.length; i += 15) {
          if (res[i].salinity <= 0) {
            continue
          }
          pressure = res[i].pressure
          var oxygen = res[i].oxygen

          this.chartData.labels.push(parseFloat(pressure))
          this.chartData.datasets[2].data.push({ x: parseFloat(oxygen), y: pressure })
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
            backgroundColor: 'orange',
            borderColor: 'orange',
            fill: 'false',
            data: []
          },
          {
            label: 'Temperature',
            backgroundColor: 'purple',
            borderColor: 'purple',
            fill: 'false',
            data: []
          },
          {
            label: 'Oxygen',
            backgroundColor: 'green',
            borderColor: 'green',
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
    max-width: 400px;
    align-content: right;
  }
  .gradient {
    color: rgba(0,249,19,1);
    background: linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(246,0,255,1) 10%, rgba(147,0,255,1) 20%, rgba(0,3,255,1) 30%, rgba(0,226,255,1) 40%, rgba(0,255,117,1) 50%, rgba(0,249,19,1) 60%, rgba(239,255,0,1) 70%, rgba(255,164,0,1) 80%, rgba(255,0,0,1) 90%, rgba(0,0,0,1) 100%);
  }
</style>
