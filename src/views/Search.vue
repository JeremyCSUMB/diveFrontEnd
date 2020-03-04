<template>
  <div class="search">
    <VueSelect/>

    <SearchBar/>
  </div>
</template>

<script>

// @ is an alias to /src
import SearchBar from '@/components/SearchBar.vue'
import VueSelect from '@/components/VueSelect.vue'
require('bootstrap')
export default {
  name: 'Search',
  components: {
    SearchBar,
    VueSelect
  }
}
</script>
