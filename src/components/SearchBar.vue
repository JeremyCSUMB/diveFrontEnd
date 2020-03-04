<template>
    <div class="search">
        <p>{{ message }}</p>
        <input v-model="message">
    </div>
</template>

<script>
export default {
  name: 'SearchBar',
  data: function () {
    return {
      message: 'Dive Number #'
    }
  }
}
</script>

<style scoped>

</style>
