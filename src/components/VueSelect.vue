<template>
  <div>
      <div id="select">
          <h1>ROV Name</h1>
          <v-select :options="options" :value="value" @input="setRov"></v-select>
          <h1>ROV Number</h1>
          <p>{{ message }}</p>
          <input id="txtName" @input="addMessage" v-model="txtInput" type="text">
          <button v-on:click="submitData()">Submit</button>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import vSelect from 'vue-select'
Vue.component('v-select', vSelect)
export default {
  name: 'vueSelect',
  props: {
    value: String
  },
  data () {
    return {
      options: [],
      txtInput: ''
    }
  },
  created: function () {
    axios
      .get('http://localhost:8080/dive/getRovNames')
      .then(response => {
        var names = JSON.parse(JSON.stringify(response.data))
        console.log(names)
        for (var name in names) {
          this.options.push(names[name])
        }
      })
  },
  methods: {
    addMessage () {
      console.log(this.txtInput)
    },
    setRov (value) {
      this.value = value
      console.log(this.value)
    },
    submitData () {
      this.$router.push('DiveRoute/' + this.value + '/' + this.txtInput)
    }
  }
}
</script>

<style scoped>
    body {
    font-family: 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif;
    text-rendering: optimizelegibility;
    -moz-osx-font-smoothing: grayscale;
    -moz-text-size-adjust: none;
    }

    h1,.muted {
    color: #2c3e5099;
    }

    h1 {
    font-size: 26px;
    font-weight: 600;
    }

    #select {
    max-width: 30em;
    margin: 1em auto;
    }
</style>
