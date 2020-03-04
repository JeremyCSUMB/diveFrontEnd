<template>
    <div class="select">
        <VueSelect/>
    </div>
</template>

<script>
// @ is an alias to /src
import VueSelect from '@/components/VueSelect.vue'

export default {
  name: 'Select',
  components: {
    VueSelect
  }
}
</script>
