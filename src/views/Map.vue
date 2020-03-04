<template>

  <div>
    <TravelMap class='travel-map'/>
  </div>
</template>

<script>
import TravelMap from '@/components/TravelMap'
require('bootstrap')
export default {
  name: 'Map',
  components: {
    TravelMap
  }
}
</script>

<style lang='scss' scoped>
.travel-map {
  height: 400px
}
</style>
