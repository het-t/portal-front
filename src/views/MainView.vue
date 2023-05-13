<template>
  <div id="main">
    <div id="pa" :class="showLabels" ref="menu">
<!-- 
      <div class="logo-container">
        <img style="height:50px; width: 100%;" src="../assets/logo/logo-500-wbg-bc-opt.png" alt="">
      </div> -->

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
          <router-link :to="{name: 'work_diary'}" tabindex="-1" class="pt16 pb16 link">
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

        <div class="link-list">
          <router-link :to="{name: 'settings'}" tabindex="-1" class="pt16 pb16 link">
            <font-awesome-icon :icon="['fas', 'gear']" class="pa-icon ml24 mr24"></font-awesome-icon>
            <span v-if="showLabels">Settings</span>
          </router-link>
        </div>

        <div class="link-list">
          <router-link v-if="rightCheck('admin_panel') == true" :to="{name: 'admin_panel'}" tabindex="-1" class="pt16 pb16 link">
            <font-awesome-icon :icon="['fas', 'gear']" class="pa-icon ml24 mr24"></font-awesome-icon>
            <span v-if="showLabels">admin</span>
          </router-link>
        </div>
      </div> 
    </div>

    <div id="pb" class="mb16" :class="'pb'+showLabels">
      <div id="top-nav" class="mb16 pr24 pl24">
        <div class="header mt8 mb8">
          <button @click="menuToggle()" tabindex="-1" class="neutral p0">
            <font-awesome-icon :icon="['fas', 'bars']" class="top-nav-icons"></font-awesome-icon>
          </button>
        </div>

        <div class="top-nav-right">
          <div class="header mt8 mb8">
            <router-link class="mr16" :to="{name: 'profile'}">
              <font-awesome-icon :icon="['fas', 'user']" class="top-nav-icons"></font-awesome-icon>
            </router-link>
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
import rightCheck from '@/helpers/RightCheck'

  export default {
    name: "MainView",
    data() {
      return {
        showLabels: true,
        getRightsAgain: true
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
      rightCheck,
      checkIfAdmin() {
        let userType;
        if (this.rightCheck('admin_panel') == true) userType = 'admin'
        else userType = 'normal'
        
        this.$store.commit('setUserType', userType)
      },
      menuToggle() {
        this.showLabels = !this.showLabels
        if (!this.showLabels) this.$refs.menu.classList.add('lessWidth')
        else this.$refs.menu.classList.remove('lessWidth')
      }
    },
    created() {
      getUserRights()
      .then((res) => {
        this.$store.commit('rights/setUserRights', res?.data?.userRights)
        this.checkIfAdmin()
      })
      .catch(() => {
          this.$cookies.remove('_token')
          this.$store.reset()
          this.$router.push({name: 'login'})
        }) 
    },
    mounted() {
      if (window.outerWidth <= 768) {
        this.menuToggle()
        this.$refs.menu.addEventListener('click', this.menuToggle);
      }
    },
    updated() {
      if (this.$store.getters['rights/getComponenetsVisibility'] == 0) {
        if (this.getRightsAgain == true) {
          this.getRightsAgain = false
          getUserRights()
          .then((res) => {
            this.$store.commit('rights/setUserRights', res?.data?.userRights)
            this.checkIfAdmin()
          })
          .catch(() => {
            this.$cookies.remove('_token')
            this.$store.reset()
            this.$router.push({name: 'login'})
          }) 
        }
      } 
    },
    beforeUnmount() {
      this.$refs.menu.removeEventListener('click', this.menuToggle)
    },
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
  button:hover, 
  button:active,
  #top-nav a:hover  {
    border: solid 1px #c2c2c2 !important;
  }
  #top-nav a {
    border: solid 1px #fff;
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