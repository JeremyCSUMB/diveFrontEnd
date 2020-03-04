<template>
  <div class="search">
    <SearchBar/>
  </div>
</template>

<script>
// @ is an alias to /src
import SearchBar from '@/components/SearchBar.vue'

export default {
  name: 'Search',
  components: {
    SearchBar
  }
}
</script>
