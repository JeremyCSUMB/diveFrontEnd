<template>
    <div id="app">
        {{ info }}
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'app',
  data: function () {
    return {
      info: null
    }
  },
  mounted () {
    axios
      .get('http://localhost:8080/dive/getRovNames')
      .then(response => (this.info = response.data))
  }
}
</script>

<style scoped>

</style>
