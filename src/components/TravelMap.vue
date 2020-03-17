<template>
  <GoogleMapLoader
    :mapConfig='mapConfig'
    apiKey
  >// insert your google maps api key to render styled map
    <template slot-scope='{ google, map }'>
      <GoogleMapMarker
        v-for='marker in markers'
        :key='marker.id'
        :marker='marker'
        :google='google'
        :map='map'
      />
    </template>
  </GoogleMapLoader>
</template>

<script>
import axios from 'axios'
import GoogleMapLoader from './GoogleMapLoader'
import GoogleMapMarker from './GoogleMapMarker'
import { mapSettings } from '@/constants/mapSettings'

export default {
  components: {
    GoogleMapLoader,
    GoogleMapMarker
  },
  data () {
    return {
      latLong: null,
      markers: [
        {
          position: { lat: 36.8044, lng: -121.7869 }
        }
      ]
    }
  },
  created: function () {
    axios
      .get('http://localhost:8080/dive/getLatsAndLongs/' + this.$route.params.rovName + '/' + this.$route.params.diveNumber)
      .then(response => {
        var latLong = JSON.parse(JSON.stringify(response.data))
        for (var i = 0; i < latLong.length; i += 100) {
          const marker = {
            lat: parseFloat(latLong[i].longitude),
            lng: parseFloat(latLong[i].latitude)
          }
          this.markers.push({ id: i, position: marker })
        }
      })
  },
  computed: {
    mapConfig () {
      return {
        ...mapSettings,
        center: this.mapCenter
      }
    },
    mapCenter () {
      return this.markers[0].position
    }
  }
}
</script>
