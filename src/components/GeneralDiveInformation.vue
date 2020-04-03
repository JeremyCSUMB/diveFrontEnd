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
  name: 'GeneralDiveInformationView',
  data () {
    return {
      generalInfo: [],
      infoData: null
    }
  },
  created: function () {
    axios.all([
      axios.get('http://localhost:8080/dive/getgeneraldiveinformation/' + this.$route.params.rovName + '/' + this.$route.params.diveNumber)
    ])
      .then( res => {
          this.infoData = JSON.stringify(res.data)
          this.infoData = JSON.parse(this.infoData)
          console.log(this.infoData)


        for (var key in this.infoData.mappingObject.infoMapping) {
          this.generalInfo.push(this.infoData.mappingObject.infoMapping[key])
        }
      })
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
