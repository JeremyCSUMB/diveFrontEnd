<template>
    <div id="select">
        <h1>ROV Name</h1>
        <v-select :options="options"></v-select>
        <h1>ROV Number</h1>
    </div>
</template>

<script>
import Vue from 'vue'
import vSelect from 'vue-select'
Vue.component('v-select', vSelect)

export default {
  name: 'select',
  data: function () {
    return {
      options: [
        'Ventana',
        'Doc Ricketts',
        'Tiburon',
        'Mini ROV'
      ]
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
