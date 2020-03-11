<template>
  <div class="search">
    <VueSelect/>

    <SearchBar/>

    <GetJSON/>
  </div>
</template>

<script>

// @ is an alias to /src
import SearchBar from '@/components/SearchBar.vue'
import VueSelect from '@/components/VueSelect.vue'
import GetJSON from '@/components/GetJSON.vue'
require('bootstrap')
export default {
  name: 'Search',
  components: {
    SearchBar,
    VueSelect,
    GetJSON
  }
}
</script>
