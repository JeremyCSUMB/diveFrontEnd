<template>
  <div id="container">
    <div id="loadingDiv">
      <img src="../assets/loading.gif">
    </div>
    <button class='button' v-on:click="goBack()">Go Back</button><br><br>
    <div class='grid-container'>
      <div class='grid-item'>
        Click Timestamp to play video.<br><br>
        <div id="linksContainer">
          <div v-for="videoLink in videoLinks" :key="videoLink" v-on:click="playVideo($event)" v-bind:id="videoLink" class="linkCard">
            <p>{{videoData[videoLink]['recorded_timestamp']}}</p>
          </div>
        </div>
        <img src='../assets/upArrow.png' id='arrows' v-on:click="changeSize()"><br><br>
      </div>
      <div class='grid-item'>
        <video @timeupdate="onTimeUpdateListener" width="90%" ref="videoRef" :emit="['timeupdate']" controls src="" id="video-player"></video><br>
      </div>
      <div class='grid-item'>
        <VueSlickCarousel v-bind="settings">
          <AncillaryChart class='chart'/>
          <AnnotationChart class='chart'/>
        </VueSlickCarousel>
      </div>
      <div class='grid-item'>
        <p>Annotations:</p>
        <div id="annotationContainer">
          <div v-if = "annotations.length == 0">
            <b>No annotations to display:(</b>
          </div>
          <div v-else v-for="(observation, index) in annotations" :key="index" v-on:click="displayAncillaryData($event)" v-bind:id="setAnnotationId(observation)" class="annotationCard">
              <div class="annotation">
                <h4><b><u>Concept: {{observation.concept}}</u></b></h4>
                <div v-if = "observation.ancillary_data === undefined" class="ancillarydata">
                  <p class="ancillaryitem"> Depth: - </p>
                  <p class="ancillaryitem"> Timestamp: {{observation.observation_timestamp}}</p>
                  <p class="ancillaryitem"> Oxygen: - </p>
                  <p class="ancillaryitem"> Salinity: - </p>
                </div>
                <div v-else class="ancillarydata">
                   <p class="ancillaryitem"> Depth: {{observation.ancillary_data.depth_meters}} </p>
                   <p class="ancillaryitem"> Timestamp: {{observation.observation_timestamp}}</p>
                   <p class="ancillaryitem"> Oxygen: {{observation.ancillary_data.oxygen_ml_l}} </p>
                   <p class="ancillaryitem"> Salinity: {{observation.ancillary_data.salinity}} </p>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import AncillaryChart from '@/components/AncillaryChart.vue'
import AnnotationChart from '@/components/AnnotationChart.vue'
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

export default {
  name: 'VideoView',
  data () {
    return {
      settings: {
        arrows: true,
        dots: true,
        dotsClass: 'slick-dots custom-dot-class',
        edgeFriction: 0.35,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      },
      videoLinks: [],
      videoData: null,
      annotations: [],
      annotationsMapByTime: [],
      currentAnnotation: null,
      currentVideo: null
    }
  },
  created: function () {
    axios
      .get('http://localhost:8080/annotations/' + this.$route.params.rovName + '/' + this.$route.params.diveNumber)
      .then(res => {
        this.videoData = JSON.stringify(res.data)
        this.videoData = JSON.parse(this.videoData)
        for (var key in this.videoData.videoOrdering) {
          this.videoLinks.push(this.videoData.videoOrdering[key])
        }
        this.$refs.videoRef.src = this.videoLinks[0]
        if (this.videoData[this.videoLinks[0]].annotations === undefined) {
          this.annotations = []
        } else {
          this.annotations = this.videoData[this.videoLinks[0]].annotations
        }
        for (key in this.annotations) {
          if (this.annotations[key].elapsed_time_millis !== undefined) {
            this.annotationsMapByTime[Math.floor(this.annotations[key].elapsed_time_millis / 1000)] = this.annotations[key]
          } else {
            const start = Math.floor(parseInt(this.videoData[this.videoLinks[0]].recorded_timestamp.split(':')[2]))
            const current = Math.floor(parseInt(this.videoData[this.videoLinks[0]].annotations[key].recorded_timestamp.split(':')[2]))
            this.annotationsMapByTime[current - start] = this.annotations[key]
          }
        }
        document.getElementById('container').removeChild(document.getElementById('loadingDiv'))
        document.getElementById('videocontainer').style.visibility = 'visible'
      })
  },
  methods: {
    playVideo (event) {
      if (this.currentAnnotation != null) {
        document.getElementById(this.currentAnnotation).classList.remove('active')
        this.currentAnnotation = null
      }
      this.$refs.videoRef.src = event.currentTarget.id
      if (this.videoData[event.currentTarget.id].annotations === undefined) {
        this.annotations = []
      } else {
        this.annotations = this.videoData[event.currentTarget.id].annotations
      }
      this.annotationsMapByTime = []
      for (var key in this.annotations) {
        if (this.annotations[key].elapsed_time_millis !== undefined) {
          this.annotationsMapByTime[Math.floor(this.annotations[key].elapsed_time_millis / 1000)] = this.annotations[key]
        } else {
          const start = Math.floor(parseInt(this.videoData[event.currentTarget.id].recorded_timestamp.split(':')[2]))
          const current = Math.floor(parseInt(this.videoData[event.currentTarget.id].annotations[key].recorded_timestamp.split(':')[2]))
          this.annotationsMapByTime[current - start] = this.annotations[key]
        }
      }

      if (this.currentVideo !== null) {
        document.getElementById(this.currentVideo).classList.remove('active')
      }
      document.getElementById(event.currentTarget.id).classList.add('active')
      this.currentVideo = event.currentTarget.id
    },

    displayAncillaryData (event) {
      if (this.annotationsMapByTime[event.currentTarget.id].ancillary_data === undefined) {
        console.log('No Ancillary Data!')
      } else {
        console.log(this.annotationsMapByTime[event.currentTarget.id].ancillary_data)
      }
      document.getElementById('video-player').currentTime = event.currentTarget.id
    },

    onTimeUpdateListener (event) {
      const time = Math.floor(document.getElementById('video-player').currentTime)
      if (this.annotationsMapByTime[time] !== undefined) {
        const annotation = document.getElementById(time)

        for (var index in this.annotationsMapByTime) {
          document.getElementById(index).className = 'annotationCard'
        }
        annotation.classList.add('active')
        this.currentAnnotation = event.currentTarget.id
        annotation.scrollIntoView()
      }
    },

    setAnnotationId (observation) {
      if (this.currentVideo === null) {
        if (observation.elapsed_time_millis !== undefined) {
          return Math.floor(observation.elapsed_time_millis / 1000)
        } else {
          const start = Math.floor(parseInt(this.videoData[this.videoLinks[0]].recorded_timestamp.split(':')[2]))
          const current = Math.floor(parseInt(observation.recorded_timestamp.split(':')[2]))

          return current - start
        }
      } else {
        if (observation.elapsed_time_millis !== undefined) {
          return Math.floor(observation.elapsed_time_millis / 1000)
        } else {
          const start = Math.floor(parseInt(this.videoData[this.currentVideo].recorded_timestamp.split(':')[2]))
          const current = Math.floor(parseInt(observation.recorded_timestamp.split(':')[2]))

          return current - start
        }
      }
    },
    goBack () {
      this.$router.go(-1)
    },

    changeSize () {
      const links = document.getElementById('linksContainer')

      if (links.style.height === '400px') {
        document.getElementById('arrows').src = require('../assets/downArrow.png')
        links.style.height = '0px'
      } else {
        document.getElementById('arrows').src = require('../assets/upArrow.png')
        links.style.height = '400px'
      }
    }
  },
  updated: function () {
    if (this.currentVideo === null) {
      document.getElementById(this.videoLinks[0]).classList.add('active')
      this.currentVideo = this.videoLinks[0]
    }
  },

  components: {
    AncillaryChart,
    AnnotationChart,
    VueSlickCarousel
  }
}
</script>

<style>
#videocontainer {
  visibility: hidden;
}
#videolinks {
  float: left;
  width: 33.33%;
}

#linksContainer {
  margin: auto;
  overflow: hidden;
  overflow-y: scroll;
  width: 250px;
  height: 400px;
  border-radius: 5px;
  border: 2px solid black;
}

#videoandannotations {
  float: left;
  width: 66.66%;
}

.linkCard {
  box-shadow: 0 4px 4px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  cursor: pointer;
}

#videocontainer:after {
  content: "";
  display: table;
  clear: both;
}

#annotationContainer {
  width: 80%;
  height:375px;
  overflow: hidden;
  overflow-y: scroll;
  margin: auto;
  border-radius: 5px;
  border: 2px solid black;
}

.annotationCard {
  width: 100%;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  cursor: pointer;
  padding-top: .6em;
}

#annotations {
  padding: 2px 16px;
}

.active {
  background-color: yellow;
}

#arrows {
  cursor: pointer;
  width: 25px;
  height: 25px;
}

.ancillarydata {
  content: "";
  display: table;
  clear: both;
  width: 100%;
}

.ancillaryitem {
  float: left;
  width: 50%;
}

.slick-prev:before, .slick-next:before {
  color: black;
}

#container {
  padding-left: 50px;
  padding-right: 50px;
}

.grid-container {
  display: grid;
  grid-template-columns: 35% 65%;
  grid-template-rows: 50% 50%;
  background-color: #2196F3;
  padding: 10px;
  height: 1300px;
}

.grid-item {
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.8);
  text-align: center;
  font-size: 11pt;
  padding-top: 10%;
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
