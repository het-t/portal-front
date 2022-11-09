<template>
  <div>
    <router-view /> 
    <MessageC v-if="getMessageVisiblity"/>
  </div>
</template>

<script>
  import MessageC from '@/components/MessageC.vue'
  import { mapGetters } from 'vuex'
  
  export default {
    computed: {
      ...mapGetters(['getMessageVisiblity'])
    },
    components: {
      MessageC
    }
  }
</script>

<style>
  @import './assets/stylesheet/main.css';
</style>