<template>
  <div id="main">
    <div id="pa" ref="menu">
      <div id="nav">

        <div class="link-list">
          <router-link to="/u/users/list" class="pt16 pb16 link">
            <font-awesome-icon :icon="['fas', 'user-group']" id="users-icon" class="pa-icon ml24 mr24"></font-awesome-icon>
            <span v-if="showLabels">users</span>
          </router-link>
        </div>

        <div class="link-list">
          <router-link to="/u/roles/list" class="pt16 pb16 link">
            <font-awesome-icon :icon="['fas', 'user-gear']" class="pa-icon ml24 mr24"></font-awesome-icon>
            <span v-if="showLabels">roles</span>
          </router-link>
        </div>

        <!-- <div class="link-list">
          <router-link to="/u/projects/list" class="pt16 pb16 link">
            <img src="../assets/icons/projects-icon.png" id="projects-icon" class="pa-icon ml24 mr24" alt="">
            <span v-if="showLabels">projects</span>
          </router-link>
        </div> -->
        
        <div class="link-list">
          <router-link to="/u/clients/list" class="pt16 pb16 link">
            <font-awesome-icon :icon="['fas', 'address-book']" class="pa-icon ml24 mr24"></font-awesome-icon>
            <span v-if="showLabels">clients</span>
          </router-link>
        </div>

        
        <div class="link-list">
          <router-link to="/u/tasks/list" class="pt16 pb16 link">
            <font-awesome-icon :icon="['fas', 'list-check']" class="pa-icon ml24 mr24"></font-awesome-icon>
            <span v-if="showLabels">tasks</span>
          </router-link>
        </div>

        <div class="link-list">
          <router-link to="/u/my-tasks/list" class="pt16 pb16 link">
            <font-awesome-icon :icon="['fas', 'sun']" class="pa-icon ml24 mr24"></font-awesome-icon>
            <span v-if="showLabels">my tasks</span>
          </router-link>
        </div>

        <div class="link-list">
          <router-link to="/u/activity" class="pt16 pb16 link">
            <font-awesome-icon :icon="['fas', 'wave-square']" class="pa-icon ml24 mr24"></font-awesome-icon>
            <span v-if="showLabels">activity</span>
          </router-link>
        </div>

      </div> 
    </div>

    <div id="pb" class="mb16">
      <div id="top-nav" class="mb16 pr24 pl24">
        <div class="header mt8 mb8">
          <button @click="menuToggle()" class="neutral">
            <font-awesome-icon :icon="['fas', 'bars']" class="top-nav-icons"></font-awesome-icon>
          </button>
        </div>

        <div class="top-nav-right">
          <div class="header mt8 mb8">
            <button class="neutral mr16">
              <font-awesome-icon :icon="['fas', 'user']" class="top-nav-icons"></font-awesome-icon>
            </button>
          </div>

          <div class="logout">
            <LogOut />
          </div>
        </div>
      </div>
      <!-- <MessageC v-if="getMessageVisiblity"/> -->

      <router-view>
      </router-view>
    </div>
  </div>
</template>

<script>
import LogOut from '@/components/LogOut.vue'
import { mapActions, mapGetters } from 'vuex'
import { getUserRights } from '../api'
  
  export default {
    name: "MainView",
    data() {
      return {
        showLabels: true,
      }
    },
    computed: {
      ...mapGetters(['getMessageVisiblity'])
    },
    components: {
      LogOut,
    },
    methods: {
      ...mapActions(['rights']),
      menuToggle() {
        this.showLabels = !this.showLabels
        if (!this.showLabels) this.$refs.menu.classList.add('lessWidth')
        else this.$refs.menu.classList.remove('lessWidth')
      }
    },
    created() {
      getUserRights()
      .then((results) => {
        this.rights(results.data.userRights)
      })
    }
  }
</script>

<style>
  .lessWidth {
    width: fit-content !important;
  }
  #tasks-icon, #my-day-icon, #activity-icon {
    scale: 1.5;
  }
</style>