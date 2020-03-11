<template>
    <div class="validate">
        <p>{{ valid[0] }}</p>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'validate',
  data () {
    return {
      valid: []
    }
  },
  props: {
    message: String
  },
  created: function () {
    axios
      .get('http://localhost:8080/dive/checkdivenumber/' + this.$route.params.rovName + '/' + this.$route.params.diveNumber)
      .then(response => {
        var val = JSON.parse(JSON.stringify(response.data))
        console.log(val)
        if (!val.exists) {
          this.valid.push('ERROR: Dive does not exist!')
        } else {
          this.valid.push('200: Dive exists!')
        }
      })
  }
}
</script>

<style scoped>

</style>
