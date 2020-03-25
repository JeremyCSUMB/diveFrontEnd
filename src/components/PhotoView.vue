<template>
    <div class="photocontainer">
        <div id="videolinks">
            <!-- <virtual-list :size="40" :remain="8">
                <li v-for="videoLink in videoLinks" :key="videoLink" v-on:click="playVideo($event)" v-bind:id="videoLink">{{videoData[videoLink]['timestamp']}}</li>
            </virtual-list> -->
        </div>
        <div id="photoandannotations" class="photoRow">
            <div class="photoColumns">
                <span v-for="photoLink in photoLinks" :key="photoLink">
                    <img v-bind:id="photoLink" v-bind:src="photoLink" width="33.33%">
                    <!-- <div>
                        {{photoData[photoLink]['timestamp']}}
                    </div> -->
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'PhotoView',
  data () {
    console.log('hahah')
    return {
      photoLinks: [],
      photoData: null,
      annotations: null
    }
  },
  created: function () {
    console.log('hello world')
    axios
      .get('http://localhost:8080/photoannotations/' + this.$route.params.rovName + '/' + this.$route.params.diveNumber)
      .then(res => {
        this.photoData = JSON.stringify(res.data)
        this.photoData = JSON.parse(this.photoData)
        console.log(this.photoData)

        for (var key in this.photoData.mappingObject.photoMapping) {
          this.photoLinks.push(this.photoData.mappingObject.photoMapping[key])
        }
        this.$refs.photoRef.src = this.photoLinks[0]
        console.log(this.photoLinks)
        // this.annotations = this.videoData[this.videoLinks[0]].annotations
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
  }
}
</script>

<style>
#videolinks {
  float: left;
  width: 33.33%;
}

.photoColumn {
  float: left;
  width: 33.33%;
}

.photoRow:after {
  content: "";
  display: table;
  clear: both;
}
</style>
