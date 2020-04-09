<template>

  <!-- everything needs to be inside app to the reactive -->
  <div id="app">

    <Loader></Loader>

  </div>
</template>

<script>
import Loader from '@/Loader.vue'

export default {
  name: 'app',
  components: {
    Loader
  },
  data(){
    return{

    }
  }
}
</script>
