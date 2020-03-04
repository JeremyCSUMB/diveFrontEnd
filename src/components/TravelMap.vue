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
      <GoogleMapLine
        v-for='line in lines'
        :key='line.id'
        :path.sync='line.path'
        :google='google'
        :map='map'
      />
    </template>
  </GoogleMapLoader>
</template>

<script>
import GoogleMapLoader from './GoogleMapLoader'
import GoogleMapMarker from './GoogleMapMarker'
import GoogleMapLine from './GoogleMapLine'

import { mapSettings } from '@/constants/mapSettings'

export default {
  components: {
    GoogleMapLoader,
    GoogleMapMarker,
    GoogleMapLine
  },

  data () {
    return {
      markers: [
        {
          id: 'a',
          position: { lat: 36.865947, lng: -122.091005 }
        },
        {
          id: 'b',
          position: { lat: 36.865945, lng: -122.091003 }
        },
        {
          id: 'c',
          position: { lat: 36.865943, lng: -122.091014 }
        }
      ],
      lines: [
        {
          id: '1',
          path: [{ lat: 36.865947, lng: -122.091005 }, { lat: 36.865945, lng: -122.091003 }]
        },
        {
          id: '2',
          path: [{ lat: 36.865945, lng: -122.091003 }, { lat: 36.865943, lng: -122.091014 }]
        }
      ]
    }
  },

  computed: {
    mapConfig () {
      return {
        ...mapSettings,
        center: this.mapCenter
      }
    },

    mapCenter () {
      return this.markers[1].position
    }
  }
}
</script>
