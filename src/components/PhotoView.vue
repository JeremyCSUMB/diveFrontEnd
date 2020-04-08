<template>
  <div id="container">
    <div id="loadingDiv">
      <img src="../assets/loading.gif">
    </div>
    <div id="main">
      <div class="photoRow">
          <div v-for="photoLink in photoLinks" :key="photoLink" class="photoColumn">
              <div class="card">
                <a v-bind:href="photoLink" target="_blank"><img v-bind:id="photoLink" v-bind:src="photoLink" width="100.00%"></a>
                <div class="container">
                  <VueSlickCarousel v-bind="settings">
                    <div v-for="(annotation, index) in photoData[photoLink].annotations" :key="index">
                      <div v-if = "photoData[photoLink].annotations[index].ancillary_data === undefined" class="ancillaryData">
                        <h4><b>{{annotation.concept}}</b></h4>
                        <p class="ancillaryitem"> Depth: - </p>
                        <p class="ancillaryitem"> Timestamp: {{photoData[photoLink]['timestamp']}}</p>
                        <p class="ancillaryitem"> Oxygen: - </p>
                        <p class="ancillaryitem"> Salinity: - </p>
                      </div>
                      <div v-else class="ancillaryData">
                        <h4><b>{{annotation.concept}}</b></h4>
                        <p class="ancillaryitem"> Depth: {{annotation.ancillary_data.depth_meters}} </p>
                        <p class="ancillaryitem"> Timestamp: {{photoData[photoLink].recorded_timestamp}}</p>
                        <p class="ancillaryitem"> Oxygen: {{annotation.ancillary_data.oxygen_ml_l}} </p>
                        <p class="ancillaryitem"> Salinity: {{annotation.ancillary_data.salinity}} </p>
                      </div>
                    </div>
                  </VueSlickCarousel>
                </div>
              </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
export default {
  name: 'PhotoView',
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
      photoLinks: [],
      photoData: null,
      annotations: null
    }
  },
  created: function () {
    axios
      .get('http://localhost:8080/photoannotations/' + this.$route.params.rovName + '/' + this.$route.params.diveNumber)
      .then(res => {
        this.photoData = JSON.stringify(res.data)
        this.photoData = JSON.parse(this.photoData)

        for (var key in this.photoData.mappingObject.photoMapping) {
          this.photoLinks.push(this.photoData.mappingObject.photoMapping[key])
        }

        document.getElementById('container').removeChild(document.getElementById('loadingDiv'))
        document.getElementById('main').style.visibility = 'visible'
      })
  },
  components: {
    VueSlickCarousel
  }
}
</script>

<style>

#main {
  visibility: hidden;
}

.card {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  width: 99%;
  float: left;
  height: 350px;
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

.container {
  padding: 2px 16px;
}

.photoRow:after {
  content: "";
  display: table;
  clear: both;
}

.photoColumn {
  float: left;
  width: 25%;
}

.ancillaryData {
  content: "";
  display: table;
  clear: both;
  width: 100%;
}

.ancillaryitem {
  float: left;
  width: 50%;
  font-size: .77em;
}

img {
  transition: transform .2s;
}

img:hover {
  position: relative;
  transform: scale(1.5);
  z-index: 9;
}
</style>
