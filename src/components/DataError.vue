<template>
  <div>
      <div id="error">
          <h5>Missing data in annotations:</h5>
          <p>Timestamps: {{timeData[0]}}</p>
          <p>Ancillary: {{ancData[0]}}</p>
          <h5>Percentage covered in dive:</h5>
          <p>Navigation: {{navData[0]}}%</p>
          <p>CTD: {{ctdData[0]}}%</p>
          <p>Camera HD: {{camhdData[0]}}%</p>
          <p>Camera SD: {{camsdData[0]}}%</p>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'dataerror',
  data () {
    return {
      timeData: [],
      ancData: [],
      navData: [],
      ctdData: [],
      camhdData: [],
      camsdData: []
    }
  },
  created: function () {
    axios.all([
      axios.get('http://localhost:8080/dataerror/timestamps/' + this.$route.params.rovName + '/' + this.$route.params.diveNumber),
      axios.get('http://localhost:8080/dataerror/ancillary/' + this.$route.params.rovName + '/' + this.$route.params.diveNumber),
      axios.get('http://localhost:8080/dataerror/navcoverage/' + this.$route.params.rovName + '/' + this.$route.params.diveNumber),
      axios.get('http://localhost:8080/dataerror/ctdcoverage/' + this.$route.params.rovName + '/' + this.$route.params.diveNumber),
      axios.get('http://localhost:8080/dataerror/camcoveragehd/' + this.$route.params.rovName + '/' + this.$route.params.diveNumber),
      axios.get('http://localhost:8080/dataerror/camcoveragesd/' + this.$route.params.rovName + '/' + this.$route.params.diveNumber)
    ])
      .then(axios.spread((timestamps, ancillary, navcoverage, ctdcoverage, camcoveragehd, camcoveragesd) => {
        var timeData = JSON.parse(JSON.stringify(timestamps.data))
        var ancData = JSON.parse(JSON.stringify(ancillary.data))
        var navData = JSON.parse(JSON.stringify(navcoverage.data))
        var ctdData = JSON.parse(JSON.stringify(ctdcoverage.data))
        var camhdData = JSON.parse(JSON.stringify(camcoveragehd.data))
        var camsdData = JSON.parse(JSON.stringify(camcoveragesd.data))
        this.timeData.push(timeData.length)
        this.ancData.push(ancData.length)
        this.navData.push(navData)
        this.ctdData.push(ctdData)
        this.camhdData.push(camhdData)
        this.camsdData.push(camsdData)
        console.log(timeData)
        console.log(ancData)
        console.log(navData)
        console.log(ctdData)
        console.log(camhdData)
        console.log(camsdData)
      }))
  }
}
</script>

<style scoped>
    body {
    font-family: 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif;
    text-rendering: optimizelegibility;
    -moz-osx-font-smoothing: grayscale;
    -moz-text-size-adjust: none;
    }

    h1,.muted {
    color: #2c3e5099;
    }

    h1 {
    font-size: 26px;
    font-weight: 600;
    }

    #error {
    text-align: left;
    max-width: 30em;
    margin: 1em auto;
    }
</style>
