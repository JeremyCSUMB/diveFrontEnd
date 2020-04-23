<template>
  <div id='main'>
    <div id='topSection' class='grid-container-top'>
      <div class='grid-item'>
        <div id='diveInfo' v-if = 'diveInfo !== null' class='topSectionElement'>
          <h5>Dive Information</h5>
          <b>Chief Scientist:</b> {{diveInfo.chiefScientist}}<br><br>
          <b>Accomplishments:</b> {{diveInfo.briefAccomplishments}}<br><br>
          <b>Start Date:</b> {{diveInfo.startDate}}<br><br>
          <b>End Date:</b> {{diveInfo.endDate}}<br><br>
          <b>Start Latitude:</b> {{diveInfo.latitude}}<br><br>
          <b>Start Longitude:</b> {{diveInfo.longitude}}<br><br>
          <b>ROV Name:</b> {{diveInfo.rovName}}<br><br>
          <b>Dive Number:</b> {{diveInfo.diveNumber}}<br><br>
        </div>
      </div>
      <div class='grid-item'>
        <DataError class='topSectionElement'/>
      </div>
    </div>

    <br>

    <div id='downloadbuttons'>
      <toggle-button ref='downloadtoggle'
        @change='onToggleUpdate()'
        :value='togglestatus'
        :labels='{checked: "CSV", unchecked: "JSON"}'
        :width='60'
        :color='{unchecked: "#2196F3", checked: "#4CAF50"}'/><br>
      <button class='button' v-on:click='jsonOrCsv("ctd")' id='ctdbutton' disabled>Download CTD</button>
      <button class='button' v-on:click='jsonOrCsv("navigation")' id='navbutton' disabled>Download Navigation</button>
    </div>
    <br>
    <br>
    <div class='grid-container-bottom'>
      <div class='grid-item'>
        <TravelMap class='map'/>
      </div>
      <div class='grid-item'>
        <Chart class='chart'/>
      </div>
      <div class='grid-item'>
        <AncillaryChart class='aChart'/>
      </div>
      <div class='grid-item'>
        <OTSChart class='ots'/>
      </div>
      <br>
    </div>

    <br>
    <div>
      <button class='button' v-on:click='directToPhotoPage()'>View Photos</button>
      <button class='button' v-on:click='directToVideoPage()'>View Video</button>
    </div>

    <br>
  </div>
</template>

<script>
import TravelMap from '@/components/TravelMap'
import Chart from '@/components/Chart.vue'
import AncillaryChart from '@/components/AncillaryChart.vue'
import DataError from '@/components/DataError.vue'
import OTSChart from '@/components/OTSChart.vue'
import { ToggleButton } from 'vue-js-toggle-button'
import axios from 'axios'
require('bootstrap')
export default {
  name: 'DiveRoute',
  data () {
    return {
      diveInfo: null,
      ctdData: null,
      latsAndLongs: null,
      togglestatus: false
    }
  },
  created: function () {
    axios.all([
      axios.get('http://localhost:8080/dive/getgeneraldiveinformation/' + this.$route.params.rovName + '/' + this.$route.params.diveNumber),
      axios.get('http://localhost:8080/dive/getctd/' + this.$route.params.rovName + '/' + this.$route.params.diveNumber),
      axios.get('http://localhost:8080/dive/getlatsandlongs/' + this.$route.params.rovName + '/' + this.$route.params.diveNumber)
    ])
      .then(axios.spread((diveInfo, ctdData, latsAndLongs) => {
        this.diveInfo = JSON.parse(JSON.stringify(diveInfo.data))
        this.ctdData = JSON.parse(JSON.stringify(ctdData.data))
        this.latsAndLongs = JSON.parse(JSON.stringify(latsAndLongs.data))

        document.getElementById('ctdbutton').disabled = false
        document.getElementById('navbutton').disabled = false
      }))
  },
  components: {
    TravelMap,
    Chart,
    AncillaryChart,
    DataError,
    OTSChart,
    ToggleButton
  },
  methods: {
    directToVideoPage () {
      this.$router.push('/video/' + this.$route.params.rovName + '/' + this.$route.params.diveNumber)
    },

    directToPhotoPage () {
      this.$router.push('/photo/' + this.$route.params.rovName + '/' + this.$route.params.diveNumber)
    },

    onToggleUpdate () {
      this.togglestatus = !this.togglestatus
      if (this.togglestatus === false) {
        document.getElementById('ctdbutton').style.backgroundColor = '#2196F3'
        document.getElementById('navbutton').style.backgroundColor = '#2196F3'
      } else {
        document.getElementById('ctdbutton').style.backgroundColor = '#4CAF50'
        document.getElementById('navbutton').style.backgroundColor = '#4CAF50'
      }
    },

    jsonOrCsv (datatype) {
      if (this.togglestatus) { // For Csv
        this.downloadCsvData(datatype)
      } else { // For Json
        this.downloadJsonData(datatype)
      }
    },

    downloadJsonData (datatype) {
      var exportObj
      var exportName
      if (datatype === 'ctd') {
        exportObj = this.ctdData
        exportName = this.$route.params.rovName + this.$route.params.diveNumber + 'ctdData'
      } else {
        exportObj = this.latsAndLongs
        exportName = this.$route.params.rovName + this.$route.params.diveNumber + 'navData'
      }

      var dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportObj))
      var downloadAnchorNode = document.createElement('a')
      downloadAnchorNode.setAttribute('href', dataStr)
      downloadAnchorNode.setAttribute('download', exportName + '.json')
      document.body.appendChild(downloadAnchorNode) // required for firefox
      downloadAnchorNode.click()
      downloadAnchorNode.remove()
    },

    JSONToCSVConvertor (JSONData, ShowLabel, fileName) {
      var arrData = typeof JSONData !== 'object' ? JSON.parse(JSONData) : JSONData

      var CSV = ''
      if (ShowLabel) {
        var row = ''
        for (var index in arrData[0]) {
          row += index + ','
        }
        row = row.slice(0, -1)
        CSV += row + '\r\n'
      }

      for (var i = 0; i < arrData.length; i++) {
        row = ''
        for (var ind in arrData[i]) {
          row += '"' + arrData[i][ind] + '",'
        }

        row.slice(0, row.length - 1)
        CSV += row + '\r\n'
      }

      if (CSV === '') {
        return
      }

      var uri = 'data:text/csv;charset=utf-8,' + escape(CSV)
      var link = document.createElement('a')
      link.href = uri
      link.style = 'visibility:hidden'
      link.download = fileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },

    downloadCsvData (datatype) {
      var exportObj
      var exportName
      if (datatype === 'ctd') {
        exportObj = this.ctdData
        exportName = this.$route.params.rovName + this.$route.params.diveNumber + 'ctdData'
      } else {
        exportObj = this.latsAndLongs
        exportName = this.$route.params.rovName + this.$route.params.diveNumber + 'navData'
      }

      this.JSONToCSVConvertor(exportObj, true, exportName)
    }
  }
}
</script>

<style lang='scss' scoped>

#diveInfo {
  overflow: wrap;
  text-align: left;
  max-width: 30em;
  margin: 0 auto;
}

#topSection {
  width: 100%;
}

#topSection:after {
  content: '';
  display: table;
  clear: both;
}

.topSectionElement {
  float: left;
  width: 50%;
  padding-left: 15%;
}

#charts:after {
  content: '';
  display: table;
  clear: both;
}

.map {
  width: 80%;
  height: 80%;
  margin: auto;
}

.chart {
  padding-top: 10%;
  margin: auto;
}

.ots {
  position: relative;
  margin: auto;
}

.aChart {
  padding-top: 5%;
  height: 600px;
  margin: auto;
}

#main {
  margin: 0 auto;
  padding-left: 100px;
  padding-right: 100px;
  padding-bottom: 50px;
}

.grid-container-top {
  display: grid;
  grid-template-columns: 50% 50%;
  background-color: #2196F3;
  padding: 10px;
}

.grid-container-bottom {
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 50% 50%;
  background-color: #2196F3;
  padding: 10px;
}

.grid-item {
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.8);
  text-align: center;
  font-size: 10pt;
}

.button {
  background-color: #2196F3; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
}

.button:hover {
  box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19);
}

</style>
