<template>
    <div class="search">
        <p>{{ message }}</p>
        <input id="txtName" @keyup.enter="addMessage" v-model="txtInput" type="text">
    </div>
</template>

<script>
export default {
  name: 'search',
  data: function () {
    return {
      txtInput: ''
    }
  },
  methods: {
    addMessage () {
      console.log(this.txtInput)
    }
  }
}
</script>

<style scoped>

</style>
