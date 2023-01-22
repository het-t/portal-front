<template>
    <button @click.prevent="logout()" tabindex="-1" class="mt8 mb8">
      <font-awesome-icon :icon="['fas', 'power-off']" class="top-nav-icons"></font-awesome-icon>
    </button>
</template>

<script>
  // import axios from 'axios';

  export default {  
    name: 'LogOut',
    methods: {
      logout() {
        this.$cookies.remove('_token')
        this.$router.push({name: 'login'})
        this.$store.reset()
      },
    }
  }
</script>

<style scoped>
button {
  padding: 0 4px;
  border: none;
  border: solid 1px #fff;
  background-color: #fff;
}
</style>