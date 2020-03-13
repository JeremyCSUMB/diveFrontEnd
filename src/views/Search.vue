<template>
  <div class="search">
    <VueSelect/>
  </div>
</template>

<script>

import VueSelect from '@/components/VueSelect.vue'
require('bootstrap')
export default {
  name: 'Search',
  components: {
    VueSelect
  }
}
</script>
