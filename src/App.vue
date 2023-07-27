<template>
    <metainfo>
      <template v-slot:title="{ content }">{{ content ? `${content} - Corporate Tasks` : `Corporate Tasks`}}</template>
    </metainfo>

    <router-view /> 
</template>

<script>
import {useMeta} from 'vue-meta';

export default {
  name: 'App',
  setup() {
    useMeta({
      title: '',
      meta: [
        {name: 'description', content: 'Manage tasks/projects efficiently with our easy-to-use tasks/projects management website. Stay organized and productive with features like task creation, priority setting, due dates, work-diary, clients creation and more.'},
        
      ]
    })
  }
}
</script>

<style>
  @import './assets/stylesheet/main.css';
</style>