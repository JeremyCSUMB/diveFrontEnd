<template>
  <div id='map'>
    <div class="info" style="height: 15%">
    </div>
    <l-map
      style="height: 500px; width: 500px"
      :zoom="zoom"
      :center="center"
    >
      <l-tile-layer :url="url"></l-tile-layer>
      <l-marker v-for="item in markers" :key="item.id" :lat-lng="item.latlng" @l-add="$event.target.openPopup()"></l-marker>
    </l-map>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet'
import axios from 'axios'

export default {
  components: { LMap, LTileLayer, LMarker },
  data () {
    console.log('hello')
    return {
      LMarker: [36.8044, -121.79],
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      zoom: 15,
      center: [36.8044, -121.7869],
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      bounds: null,
      markers: []
    }
  },
  mounted () {
    axios
      .get('http://localhost:8080/dive/getlatsandlongs/' + this.$route.params.rovName + '/' + this.$route.params.diveNumber)
      .then(response => {
        var latLong = JSON.parse(JSON.stringify(response.data))
        for (var i = 0; i < latLong.length; i += 65) {
          this.markers.push({
            id: i,
            latlng: [latLong[i].longitude, latLong[i].latitude],
            content: 'test'
          })
        }
        this.center = [latLong[5].longitude, latLong[5].latitude]
      })
  }
}
</script>
