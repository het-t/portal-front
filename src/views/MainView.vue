<template>
  <div id="main">
    <div id="pa" ref="menu">
      <div id="nav">

        <div class="link-list">
          <router-link to="/u/users/list" tabindex="-1" class="pt16 pb16 link">
            <font-awesome-icon :icon="['fas', 'user-group']" id="users-icon" class="pa-icon ml24 mr24"></font-awesome-icon>
            <span v-if="showLabels">users</span>
          </router-link>
        </div>

        <div class="link-list">
          <router-link to="/u/roles/list" tabindex="-1" class="pt16 pb16 link">
            <font-awesome-icon :icon="['fas', 'user-gear']" class="pa-icon ml24 mr24"></font-awesome-icon>
            <span v-if="showLabels">roles</span>
          </router-link>
        </div>
        
        <div class="link-list">
          <router-link to="/u/clients/list" tabindex="-1" class="pt16 pb16 link">
            <font-awesome-icon :icon="['fas', 'address-book']" class="pa-icon ml24 mr24"></font-awesome-icon>
            <span v-if="showLabels">clients</span>
          </router-link>
        </div>

        
        <div class="link-list">
          <router-link to="/u/tasks/list" tabindex="-1" class="pt16 pb16 link">
            <font-awesome-icon :icon="['fas', 'list-check']" class="pa-icon ml24 mr24"></font-awesome-icon>
            <span v-if="showLabels">tasks</span>
          </router-link>
        </div>

        <div class="link-list">
          <router-link to="/u/my-tasks/list" tabindex="-1" class="pt16 pb16 link">
            <font-awesome-icon :icon="['fas', 'sun']" class="pa-icon ml24 mr24"></font-awesome-icon>
            <span v-if="showLabels">my tasks</span>
          </router-link>
        </div>

        <div class="link-list">
          <router-link to="/u/activity" tabindex="-1" class="pt16 pb16 link">
            <font-awesome-icon :icon="['fas', 'wave-square']" class="pa-icon ml24 mr24"></font-awesome-icon>
            <span v-if="showLabels">activity</span>
          </router-link>
        </div>

      </div> 
    </div>

    <div id="pb" class="mb16">
      <div id="top-nav" class="mb16 pr24 pl24">
        <div class="header mt8 mb8">
          <button @click="menuToggle()" tabindex="-1" class="neutral p0">
            <font-awesome-icon :icon="['fas', 'bars']" class="top-nav-icons"></font-awesome-icon>
          </button>
        </div>

        <div class="top-nav-right">
          <div class="header mt8 mb8">
            <button class="mr16" tabindex="-1">
              <font-awesome-icon :icon="['fas', 'user']" class="top-nav-icons"></font-awesome-icon>
            </button>
          </div>

          <div class="logout">
            <LogOut />
          </div>
        </div>
      </div>

      <the-breadcrumb></the-breadcrumb>

      <router-view v-if="allow" class="pt24">
      </router-view>
    </div>
  </div>
</template>

<script>
import LogOut from '@/components/LogOut.vue'
import { getUserRights } from '../api'
import TheBreadcrumb from '../components/TheBreadcrumb.vue'

  export default {
    name: "MainView",
    data() {
      return {
        allow: false,
        showLabels: true,
      }
    },
    components: {
      LogOut,
      TheBreadcrumb,
    },
    methods: {
      menuToggle() {
        this.showLabels = !this.showLabels
        if (!this.showLabels) this.$refs.menu.classList.add('lessWidth')
        else this.$refs.menu.classList.remove('lessWidth')
      }
    },
    created() {
      this.$store.subscribe((mutations, state) => {
        console.log(mutations, state)
      })
      if (this.$store.getters['rights/getUserRights'] == '') {
        getUserRights()
        .then((res) => {
          this.$store.commit('rights/setUserRights', res?.data?.userRights)
          this.allow = true
        })
      }
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
  button:hover, button:active {
    border: solid 1px #c2c2c2 !important;
  }
</style>