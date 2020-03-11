<template>
    <div class="search">
        <p>{{ message }}</p>
        <input v-model="message">
    </div>
</template>

<script>
export default {
  name: 'validate',
  props: {
    message: String
  }
}
</script>

<style scoped>

</style>
