<template>
  <div class="container">
    {{$route.params.rovName}}
    {{$route.params.diveNumber}}
    {{video}}
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'VideoView',
  data () {
    return {
      video: null
    }
  },
  created: function () {
    axios
      .get('http://localhost:8080/annotations/' + this.$route.params.rovName + '/' + this.$route.params.diveNumber)
      .then(res => {
        this.video = res.data
      })
  }
}
</script>
