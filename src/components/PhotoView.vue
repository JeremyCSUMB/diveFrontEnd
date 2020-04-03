<template>
  <div class="photoColumns">
      <span v-for="photoLink in photoLinks" :key="photoLink">
          <div class="card">
            <img v-bind:id="photoLink" v-bind:src="photoLink" width="100.00%">
            <div class="container">
              <h4><b>{{photoData[photoLink]['timestamp']}}</b></h4>
              <!-- <p>{{photoData[photoLink]['annotations']}}</p> -->
              <p class="ancillaryitem">{{photoData[photoLink].annotations}} </p>
              <!-- <p class="ancillaryitem"> Timestamp: {{photoData[photoLink].observation_timestamp}}</p>
              <p class="ancillaryitem"> Oxygen: {{photoData[photoLink].ancillary_data.oxygen_ml_l}} </p>
              <p class="ancillaryitem"> Salinity: {{photoData[photoLink].ancillary_data.salinity}} </p> -->
            </div>
          </div>
      </span>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'PhotoView',
  data () {
    return {
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
        console.log(this.photoData)

        for (var key in this.photoData.mappingObject.photoMapping) {
          this.photoLinks.push(this.photoData.mappingObject.photoMapping[key])
        }
        this.$refs.photoRef.src = this.photoLinks[0]
      })
  }
}
</script>

<style>
.card {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  width: 40%;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

.container {
  padding: 2px 16px;
}
</style>
