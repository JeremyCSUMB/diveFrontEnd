<template>
  <div id="container">
    <div id="loadingDiv">
      <img src="../assets/loading.gif">
    </div>
    <div id="videocontainer">
      <div id="videolinks">
        Click Timestamp to play video.<br><br>
        <div id="linksContainer">
          <div v-for="videoLink in videoLinks" :key="videoLink" v-on:click="playVideo($event)" v-bind:id="videoLink" class="linkCard">
            <p>{{videoData[videoLink]['timestamp']}}</p>
          </div>
        </div>
      </div>
      <div id="videoandannotations">
        <video @timeupdate="onTimeUpdateListener" width="90%" ref="videoRef" :emit="['timeupdate']" controls src="" id="video-player"></video><br>
        <p>Annotations:</p>
        <div id="annotationContainer">
          <div v-if = "annotations.length == 0">
            <b>No annotations to display:(</b>
          </div>
          <div v-else v-for="(observation, index) in annotations" :key="index" v-on:click="displayAncillaryData($event)" v-bind:id="Math.floor(observation.elapsed_time_millis / 1000)" class="annotationCard">
              <div class="annotation">
                <h4><b>Concept: {{observation.concept}}</b></h4>
                <p>Observer: {{observation.observer}}</p>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'VideoView',
  data () {
    return {
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
        for (var key in this.videoData.mappingObject.videoMapping) {
          this.videoLinks.push(this.videoData.mappingObject.videoMapping[key])
        }
        this.$refs.videoRef.src = this.videoLinks[0]
        this.annotations = this.videoData[this.videoLinks[0]].annotations
        for (key in this.annotations) {
          if (this.annotations[key].elapsed_time_millis !== null) {
            this.annotationsMapByTime[Math.floor(this.annotations[key].elapsed_time_millis / 1000)] = this.annotations[key]
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
      this.annotations = this.videoData[event.currentTarget.id].annotations
      this.annotationsMapByTime = []
      for (var key in this.annotations) {
        if (this.annotations[key].elapsed_time_millis !== null) {
          this.annotationsMapByTime[Math.floor(this.annotations[key].elapsed_time_millis / 1000)] = this.annotations[key]
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
      if (this.currentAnnotation !== null) {
        document.getElementById(this.currentAnnotation).classList.remove('active')
      }

      this.currentAnnotation = event.currentTarget.id
      const annotation = document.getElementById(event.currentTarget.id)
      annotation.classList.add('active')
      document.getElementById('video-player').currentTime = this.annotationsMapByTime[event.currentTarget.id].elapsed_time_millis / 1000
    },

    onTimeUpdateListener (event) {
      const time = Math.floor(document.getElementById('video-player').currentTime)
      if (this.annotationsMapByTime[time] !== undefined) {
        const annotation = document.getElementById(time)
        annotation.scrollIntoView()

        if (this.currentAnnotation !== null) {
          document.getElementById(this.currentAnnotation).classList.remove('active')
        }
        annotation.classList.add('active')
        this.currentAnnotation = event.currentTarget.id
      }
    }
  },
  updated: function () {
    if (this.currentVideo === null) {
      document.getElementById(this.videoLinks[0]).classList.add('active')
      this.currentVideo = this.videoLinks[0]
    }
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
}

#annotations {
  padding: 2px 16px;
}

.active {
  background-color: yellow;
}
</style>
