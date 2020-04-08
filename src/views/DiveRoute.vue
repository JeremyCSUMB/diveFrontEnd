<template>
  <div id="container">
    <div id="main">
      <div id="topSection">
        <div id='diveInfo' v-if = "diveInfo !== null" class="topSectionElement">
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
        <DataError class="topSectionElement"/>
      </div>
      <div id="charts">
        <TravelMap class='map'/>
        <Chart class='chart'/>
      </div>
      <AncillaryChart class='aChart'/>
      <div>
        <button v-on:click="directToPhotoPage()">View Photos</button>
        <button v-on:click="directToVideoPage()">View video</button>
      </div>
      <br>
    </div>
  </div>
</template>

<script>
import TravelMap from '@/components/TravelMap'
import Chart from '@/components/Chart.vue'
import AncillaryChart from '@/components/AncillaryChart.vue'
import DataError from '@/components/DataError.vue'
import axios from 'axios'
require('bootstrap')
export default {
  name: 'DiveRoute',
  data () {
    return {
      diveInfo: null
    }
  },
  created: function () {
    axios
      .get('http://localhost:8080/dive/getgeneraldiveinformation/' + this.$route.params.rovName + '/' + this.$route.params.diveNumber)
      .then(res => {
        this.diveInfo = JSON.parse(JSON.stringify(res.data))
      })
  },
  components: {
    TravelMap,
    Chart,
    AncillaryChart,
    DataError
  },
  methods: {
    directToVideoPage () {
      this.$router.push('/video/' + this.$route.params.rovName + '/' + this.$route.params.diveNumber)
    },

    directToPhotoPage () {
      this.$router.push('/photo/' + this.$route.params.rovName + '/' + this.$route.params.diveNumber)
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
  content: "";
  display: table;
  clear: both;
}

.topSectionElement {
  float: left;
  width: 50%;
  padding-left: 15%;
}

#charts:after {
  content: "";
  display: table;
  clear: both;
}

.map {
  float: left;
  width: 50%;
  height: 500px;
}

.chart {
  float: right;
  width: 50%;
}

.aChart {
  width: 500px;
}

#main {
  margin: 0 auto;
  padding-left: 100px;
  padding-bottom: 50px;
}

</style>
