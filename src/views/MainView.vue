<template>
  <div id="main">
    <div id="pa" :class="showLabels" ref="menu">

      <div v-if="showLabels" class="logo-container">
        <img class="mt8 mr8 ml8 mb8" id="logo" src="../assets/logo.png">
      </div>

      <div id="nav">
        <div class="link-list">
          <router-link :to="{name: 'users_list'}" tabindex="-1" class="pt16 pb16 link">
            <font-awesome-icon :icon="['fas', 'user-group']" id="users-icon" class="pa-icon ml24 mr24"></font-awesome-icon>
            <span v-if="showLabels">users</span>
          </router-link>
        </div>

        <div class="link-list">
          <router-link :to="{name: 'roles_list'}" tabindex="-1" class="pt16 pb16 link">
            <font-awesome-icon :icon="['fas', 'user-gear']" class="pa-icon ml24 mr24"></font-awesome-icon>
            <span v-if="showLabels">roles</span>
          </router-link>
        </div>
        
        <div class="link-list">
          <router-link :to="{name: 'clients_list'}" tabindex="-1" class="pt16 pb16 link">
            <font-awesome-icon :icon="['fas', 'address-book']" class="pa-icon ml24 mr24"></font-awesome-icon>
            <span v-if="showLabels">clients</span>
          </router-link>
        </div>

        
        <div class="link-list">
          <router-link :to="{name: 'tasks_list'}" tabindex="-1" class="pt16 pb16 link">
            <font-awesome-icon :icon="['fas', 'list-check']" class="pa-icon ml24 mr24"></font-awesome-icon>
            <span v-if="showLabels">tasks</span>
          </router-link>
        </div>

        <div class="link-list">
          <router-link to="/u/assigned/list" tabindex="-1" class="pt16 pb16 link">
            <font-awesome-icon :icon="['fas', 'user-check']" class="pa-icon ml24 mr24"></font-awesome-icon>
            <span v-if="showLabels">Work&nbsp;Diary</span>
          </router-link>
        </div>

        <div class="link-list">
          <router-link :to="{name: 'my_tasks_list'}" tabindex="-1" class="pt16 pb16 link">
            <font-awesome-icon :icon="['fas', 'sun']" class="pa-icon ml24 mr24"></font-awesome-icon>
            <span v-if="showLabels">my&nbsp;tasks</span>
          </router-link>
        </div>

        <div class="link-list">
          <router-link :to="{name: 'activity'}" tabindex="-1" class="pt16 pb16 link">
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

      <router-view v-if="getComponenetsVisibility" class="pt24">
      </router-view>
    </div>
  </div>
</template>

<script>
import LogOut from '@/components/LogOut.vue'
import { getUserRights } from '../api'
import TheBreadcrumb from '../components/TheBreadcrumb.vue'
import { mapGetters } from 'vuex'

  export default {
    name: "MainView",
    data() {
      return {
        showLabels: true,
      }
    },
    computed: {
      ...mapGetters('rights', [
        'getComponenetsVisibility'
      ])
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
      if (this.$store.getters['rights/getComponenetsVisibility'] == 0) {
        getUserRights()
        .then((res) => {
          this.$store.commit('rights/setUserRights', res?.data?.userRights)
        })
      } 
    },
    updated() {
      if (this.$store.getters['rights/getComponenetsVisibility'] == 0) {
        getUserRights()
        .then((res) => {
          this.$store.commit('rights/setUserRights', res?.data?.userRights)
        })
      } 
    }
  }
</script>

<style>
  @import '../assets/stylesheet/multiselect.css';
  
  .lessWidth {
    width: fit-content !important;
  }
  #tasks-icon, #my-day-icon, #activity-icon {
    scale: 1.5;
  }
  button:hover, button:active {
    border: solid 1px #c2c2c2 !important;
  }
  #logo {
    width: 150px;
  }
  .logo-container {
    background-color: #293846;
    box-shadow: 0 0 5px #293846;
    height: 50px;
  }
</style>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>