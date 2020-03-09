<template>
  <div class="videocontainer">
    <div id="videolinks">
      Click Timestamp to play video.
      <virtual-list :size="40" :remain="8">
        <li v-for="videoLink in videoLinks" :key="videoLink" v-on:click="playVideo($event)" v-bind:id="videoLink">{{videoData[videoLink]['timestamp']}}</li>
      </virtual-list>
    </div>
    <div id="videoandannotations">
      <video width="90%" ref="videoRef" controls src="" id="video-container"></video><br>
      Annotations:
      <div id="annotations"></div>
        <li v-for="(observation, index) in annotations" :key="index" v-on:click="displayAncillaryData($event)" v-bind:id="index">
          Concept: {{observation.concept}}
          Observer: {{observation.observer}}
        </li>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import virtualList from 'vue-virtual-scroll-list'
export default {
  name: 'VideoView',
  data () {
    return {
      videoLinks: [],
      videoData: null,
      annotations: null
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
      })
  },
  methods: {
    playVideo (event) {
      this.$refs.videoRef.src = event.currentTarget.id
      this.annotations = this.videoData[event.currentTarget.id].annotations
    },

    displayAncillaryData (event) {
      console.log(this.annotations[event.currentTarget.id].ancillary_data)
    }
  },
  components: {
    'virtual-list': virtualList
  }
}
</script>

<style>
#videolinks {
  float: left;
  width: 33.33%;
}

#videoandannotations {
  float: left;
  width: 66.66%;
}

.videocontainer:after {
  content: "";
  display: table;
  clear: both;
}
</style>
